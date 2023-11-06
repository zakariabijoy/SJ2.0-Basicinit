using System.Text.Json.Serialization;

namespace API.DTOs
{
    public class FileContentDto
    {
        public Guid Id { get; set; }
        public string InvoiceNo { get; set; }
        public string Url { get; set; }
        public double ElectricityBill { get; set; }
        public string Building { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime ModifiedDate { get; set; } = DateTime.UtcNow;
    }
}