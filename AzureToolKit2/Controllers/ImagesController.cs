﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AzureToolKit2.Models;
using AzureToolKit2.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureToolKit2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private CloudBlobContainer _container;
        private AzureToolkitContext _context;
        public ImagesController(AzureToolkitContext context)
        {
            this._context = context;
            CloudStorageAccount storageAccount = new CloudStorageAccount(
                new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials(
                        "azurestoragethilina",
                        "AaSEdv+1TcDWIUFDSe4QrkNegv7DLq2Sx05tCq0Zr7JLqROXAq6P3dBK4Rme9OiCsno4X5JcBredjzKkrf/YMQ=="), true);
            // Create a blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            _container = blobClient.GetContainerReference("savedimages");
        }

        [HttpGet("{userId}")]
        public IActionResult GetImages(string userID)
        {
            var images = _context.SavedImages.Where(image => image.UserId == userID);
            return Ok(images);
        }

        [HttpGet("search/{userId}/{term}")]
        public IActionResult SearchImages(string userId, string term)
        {
            string searchServiceName = "azuretoolkitsearch-thilina";
            string queryApiKey = "84355D3AB6B1027BEFD0442C3876F5C2";

            SearchIndexClient indexClient = new SearchIndexClient(searchServiceName, "desctiption", new SearchCredentials(queryApiKey));
            SearchParameters parameters = new SearchParameters() { Filter = $"UserId eq '{userId}'" };
            DocumentSearchResult<SavedImage> results = indexClient.Documents.Search<SavedImage>(term, parameters);

            return Ok(results.Results.Select(r => r.Document));
        }

        [HttpPost]
        public async Task<IActionResult> PostImage([FromBody]ImagePostRequest request)
        {
            try
            {
                CloudBlockBlob blockBlob = _container.GetBlockBlobReference($"{request.Id}.{request.EncodingFormat}");
                HttpWebRequest aRequest = (HttpWebRequest)WebRequest.Create(request.URL);
                HttpWebResponse aResponse = (await aRequest.GetResponseAsync()) as HttpWebResponse;
                var stream = aResponse.GetResponseStream();
                await blockBlob.UploadFromStreamAsync(stream);
                stream.Dispose();

                //Save metadata
                var savedImage = new SavedImage();
                savedImage.UserId = request.UserId;
                savedImage.Description = request.Description;
                savedImage.StorageUrl = blockBlob.Uri.ToString();
                savedImage.Tags = new List<SavedImageTag>();

                foreach (var tag in request.Tags)
                {
                    savedImage.Tags.Add(new SavedImageTag() { Tag = tag });
                }

                _context.Add(savedImage);
                _context.SaveChanges();


                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
          
        }
    }
}