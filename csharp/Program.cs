using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Newtonsoft.Json;

namespace ConsoleApplication
{
    public class App {
        public String Name {get; set;}
        public String Parent {get; set;}
    }
    
    public class Program
    {
        public static void Main(string[] args)
        {
            IList<String> strings = new List<String>() {
                "One",
                "Two",
                "Three",
                "Four",
                "Five"
            };
            
            XDocument xdoc = XDocument.Load("data.xml");
            
            List<App> apps = xdoc.Descendants("apps").FirstOrDefault()
                .Descendants("app")
                .Select( x => new App() {
                    Name = x.Attribute("name").Value,
                    Parent = x.Descendants("parent").First().Value
                })
                .ToList();
                
           Console.WriteLine(JsonConvert.SerializeObject(apps));
        }
    }
}
