namespace API.Entities
{
    public class FileContent
    {
        public Guid Id { get; set; } 
        public string InvoiceNo { get; set; }
        public string Url { get; set; }
        public double ElectricityBill { get; set; }
        public string Building { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set;}
    }
}