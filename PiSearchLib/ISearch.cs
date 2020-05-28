namespace PiSearchLib
{
    public interface ISearch
    {
        void SetPattern(byte[] pattern);
        unsafe int Search(byte[] searchArray, int startIndex = 0);
    }
}
