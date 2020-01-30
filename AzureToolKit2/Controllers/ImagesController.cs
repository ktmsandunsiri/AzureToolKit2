using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AzureToolKit2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureToolKit2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private CloudBlobContainer _container;
        public ImagesController()
        {
            CloudStorageAccount storageAccount = new CloudStorageAccount(
                new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials(
                        "azurestoragethilina",
                        "AaSEdv+1TcDWIUFDSe4QrkNegv7DLq2Sx05tCq0Zr7JLqROXAq6P3dBK4Rme9OiCsno4X5JcBredjzKkrf/YMQ=="), true);
            // Create a blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            _container = blobClient.GetContainerReference("savedimages");
        }

        [HttpPost]
        public async Task<IActionResult> PostImage([FromBody]ImagePostRequest request)
        {
            CloudBlockBlob blockBlob = _container.GetBlockBlobReference($"{request.Id}.{request.EncodingFormat}");
            HttpWebRequest aRequest = (HttpWebRequest)WebRequest.Create(request.URL);
            HttpWebResponse aResponse = (await aRequest.GetResponseAsync()) as HttpWebResponse;
            var stream = aResponse.GetResponseStream();
            await blockBlob.UploadFromStreamAsync(stream);
            stream.Dispose();
            return Ok();
        }
    }
}