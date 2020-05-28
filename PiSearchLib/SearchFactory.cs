namespace PiSearchLib
{
    public static class SearchFactory
    {
        public static ISearch Get(string s)
        {
            switch (s.ToLower())
            {
                case "indexof":
                    return new IndexOf();
                case "kmp":
                    return new KnuthMorrisPratt();
                default:
                    return new BoyerMoore();
            }
        }
    }
}
