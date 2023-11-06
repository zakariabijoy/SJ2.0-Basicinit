namespace API.Interfaces;

public interface ITextractService
{
    Task AnalyzeText(string filename);
    Task DetectionText(string filename);
}
