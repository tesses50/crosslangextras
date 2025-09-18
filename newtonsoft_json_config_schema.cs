using System;
using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;
namespace Tesses.CrossLang
{
    public class ProjectFile
    {
        public string name {get;set;}="";
        public string version {get;set;}="";

        public string resource_directory {get;set;}="res"; //defaults to res, this is the resource directory used for embed("filename"))
        

        public string source_directory {get;set;}="src"; //defaults to src, used for storing sourcecode

        public string bin_directory {get;set;}="bin"; //defaults to bin, used for storing output

        public string obj_directory {get;set;}="obj"; //defaults to obj, used for storing compile tools

        public List<string> project_dependencies {get;set;}=new List<string>();

        public List<Dependency> dependencies {get;set;}=new List<Dependency>();

        public ProjectInfo info {get;set;}=new ProjectInfo();
    }
    public class Dependency {
        public string name {get;set;}="";

        public string version {get;set;}="";
    }
    public class ProjectInfo //this is stored in crvm file as JSON in INFO as well (with index in STRS table)
    {
        public string maintainer {get;set;}=""; //Not checked when building project
        public string type {get;set;}=""; //gets checked whether it is compile_tool by build tool, possible values are in file: project_types.txt
        public string repo {get;set;}=""; //optional, is the place where the code is stored
        public string homepage {get;set;}=""; //optional, is the website for the project

        public string license {get;set;}=""; //optional, but recommended to tell people what the license is

        public string description {get;set;}=""; //optional but tells people about the package
    }

    public static void Main(string[] args)
    {
        var project = JsonConvert.DeserializeObject<ProjectFile>(File.ReadAllText("cross.json"));
    }
}