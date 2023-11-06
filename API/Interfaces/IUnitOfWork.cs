namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IFileContentRepository FileContentRepository {get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}