using System.Collections.Generic;

namespace PiSearchLib
{
    class TableBuilder
    {
        internal static IReadOnlyList<int> BuildTable(byte[] t)
        {
            var table = new int[t.Length];
            var i = 2;
            var j = 0;

            table[0] = -1;
            table[1] = 0;

            while (i < t.Length)
            {
                if (t[i - 1] == t[j])
                {
                    table[i] = j + 1;
                    i++;
                    j++;
                }
                else if (j > 0)
                {
                    j = table[j];
                }
                else
                {
                    table[i] = 0;
                    i++;
                }
            }
            return table;
        }
    }

    public class KnuthMorrisPratt : ISearch
    {
        private byte[] _pattern { get; set; }

        public void SetPattern(byte[] pattern)
        {
            _pattern = pattern;
        }

        public unsafe int Search(byte[] s, int startIndex)
        {

            // Follow the behavior of string.IndexOf(string) method. 
            if (_pattern.Length == 0) return 0;
            if (s.Length == 0 || s.Length < _pattern.Length) return -1;

            var table = TableBuilder.BuildTable(_pattern);
            var i = 0;

            while (startIndex + i < s.Length)
            {
                if (_pattern[i] == s[startIndex + i])
                {
                    if (i == _pattern.Length - 1)
                        return startIndex;
                    i++;
                }
                else
                {
                    if (table[i] > -1)
                    {
                        startIndex += i;
                        i = table[i];
                    }
                    else
                    {
                        startIndex++;
                        i = 0;
                    }
                }
            }
            return -1;
        }

    }
}
