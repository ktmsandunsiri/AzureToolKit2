using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AzureToolKit2.Models
{
    public class ImagePostRequest
    {
        public string UserId { get; set; }
        public string Description { get; set; }
        public string[] Tags { get; set; }
        public string URL { get; set; }
        public string Id { get; set; }
        public string EncodingFormat { get; set; }
    }
}
