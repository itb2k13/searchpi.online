using PiSearchLib;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;

namespace PiSearchApi.Controllers
{
    public static class MyConfig
    {
        public static readonly int DigitCount = 20;
    }

    public class Results
    {
        public List<Result> Tasks = new List<Result>();
        public string Pattern { get; set; }
        public double ExecutionTime { get; set; }
        public long Length { get; set; }
        private Result FirstOccurence => Tasks.Where(x => x.Position > -1)?.OrderBy(x => x.Position)?.FirstOrDefault();

        public long Position
        {
            get
            {
                return FirstOccurence?.Position - 1 ?? -1 ;
            }
            set { }
        }

        public string PrefixingDigits
        {
            get
            {
                return SurroundingDigits?.Substring(0, MyConfig.DigitCount) ?? string.Empty;
            }
            set { }
        }

        public string SuffixingDigits
        {
            get
            {
                return SurroundingDigits?.Substring(SurroundingDigits.Length - MyConfig.DigitCount, MyConfig.DigitCount) ?? string.Empty;
            }
            set { }
        }


        public string SurroundingDigits
        {
            get
            {
                return FirstOccurence?.Digits;
            }
            set { }
        }
    }

    public class Result
    {
        public int? TaskId { get; set; } = -1;
        public long FromByte { get; set; }
        public long ToByte { get; set; }
        public long Position { get; set; } = long.MinValue;
        public string Digits { get; set; } = string.Empty;
        public double ExecutionTime { get; set; }
    }

    public static class Extensions
    {
        public static int Min0(this int i)
        {
            return i >= 0 ? i : 0;
        }

    }

    public class SearchController : ApiController
    {

        [HttpGet]
        [Route("api/search/{algorithm}/{size}/{blockSize}/{parallelism}/{id}")]
        public Results Get(string algorithm, long size, int blockSize, int parallelism, string id)
        {
            var bufferSize = blockSize * 1000000;
            var totalSize = size * 1000000;
            var partitions = (totalSize / bufferSize);
            var pattern = Encoding.ASCII.GetBytes(id.ToString());
            var timer = new Stopwatch();
            var results = new Results() { Pattern = id.ToString() };
            var parts = new List<long>();
            var patternFound = false;

            for (long i = 0; i < partitions; i++)
            {
                parts.Add(Convert.ToInt64(i * bufferSize));
            }

            timer.Start();

            Parallel.ForEach(parts, new ParallelOptions { MaxDegreeOfParallelism = parallelism }, (x) =>
            {

                using (var stream = new FileStream(HostingEnvironment.MapPath($@"~/App_Data/pi-billion.txt"), FileMode.Open, FileAccess.Read))
                {
                    var result = new Result { TaskId = Task.CurrentId, FromByte = x, ToByte = x + bufferSize };

                    if (!patternFound)
                    {
                        stream.Seek(x, SeekOrigin.Begin);
                        var buffer = new byte[bufferSize];
                        var bytesRead = stream.Read(buffer, 0, bufferSize);
                        
                        if (bytesRead > 0)
                        {
                            ISearch searcher = SearchFactory.Get(algorithm);
                            searcher.SetPattern(pattern);
                            var position = searcher.Search(buffer);

                            if (position > -1)
                            {
                                patternFound = true;
                                result.Position = x + position;
                                var digits = buffer.Skip((position - MyConfig.DigitCount).Min0()).Take(pattern.Length + MyConfig.DigitCount * 2).ToList();
                                result.Digits = Encoding.ASCII.GetString(digits.ToArray());
                            }
                        }

                        result.ExecutionTime = timer.Elapsed.TotalSeconds;

                        lock (results)
                        {
                            results.Length += bytesRead;
                            results.Tasks.Add(result);
                        }
                    }

                }

            });

            timer.Stop();
            results.ExecutionTime = Math.Round(timer.Elapsed.TotalSeconds, 3);
            return results;
        }

    }
}
