#include <CrossLang.hpp>
#include "@<<HEADER>>@.h"
using namespace Tesses::Framework;
using namespace Tesses::CrossLang;
int main(int argc, char** argv)
{
    TF_InitWithConsole();
    std::string name = argv[0];
    Tesses::Framework::Filesystem::VFSPath exePath=Tesses::Framework::Filesystem::LocalFS->SystemToVFSPath(name);
    exePath.MakeAbsolute();


    
        
    GC gc;
    gc.Start();
    GCList ls(gc);
    TRootEnvironment* env = TRootEnvironment::Create(ls, TDictionary::Create(ls));
    
    TStd::RegisterStd(&gc,env);
    {
        auto ms = std::shared_ptr<Tesses::Framework::Streams::MemoryStream>(false);
        auto& buff = ms->GetBuffer();
        buff.resize(@<<CAPS_VERSION>>@_length);
        memcpy(buff.data(),@<<CAPS_VERSION>>@_data,@<<CAPS_VERSION>>@_length);
        auto file = TFile::Create(ls);
        file->Load(&gc, &ms);
        env->LoadFile(&gc,file);
    }
    
   

    if(env->HasVariable("WebAppMain"))
    {
        Args args(argc, argv);
        int port = 4206;
        for(auto& item : args.options)
        {
            if(item.first == "port")
            {
                port = std::stoi(item.second);
            }
        }
        TList* args2 = TList::Create(ls);
        args2->Add(exePath.ToString());
        for(auto& item : args.positional)
        {
            args2->Add(item);
        }

        auto res = env->CallFunction(ls, "WebAppMain", {args2});
        TObjectHttpServer http(&gc, res);
        Tesses::Framework::Http::HttpServer svr(port,http,false);
       
        svr.StartAccepting();
        TF_RunEventLoop();
        TDictionary* _dict;
        TClassObject* _co;
        if(GetObjectHeap(res,_dict))
        {
            _dict->CallMethod(ls,"Close",{});
        }
        if(GetObjectHeap(res,_co))
        {
            _co->CallMethod(ls,"","Close",{});
        }
        TF_Quit();
    }
    else {
         TList* args = TList::Create(ls);
         args->Add(exePath.ToString());
        for(int arg=1;arg<argc;arg++)
            args->Add(argv[arg]);
        auto res = env->CallFunction(ls,"main",{args});
        int64_t iresult;
        if(GetObject(res,iresult))
            return (int)iresult;
    }
    return 0;
}
            