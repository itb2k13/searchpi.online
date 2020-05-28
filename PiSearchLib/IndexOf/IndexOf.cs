using System.Text;

namespace PiSearchLib
{
    public class IndexOf : ISearch
    {
        private byte[] _pattern { get; set; }

        public void SetPattern(byte[] pattern)
        {
            _pattern = pattern;
        }

        public unsafe int Search(byte[] searchArray, int startIndex = 0)
        {
            return Encoding.ASCII.GetString(searchArray).IndexOf(Encoding.ASCII.GetString(_pattern), 0, System.StringComparison.Ordinal);
        }

    }
}
