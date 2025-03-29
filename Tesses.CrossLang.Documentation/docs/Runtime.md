# CrossLang Runtime Documentation
```go
/^ Start a process ^/
func Process.Start(process_object);
```

```go
/^ Get whether object is a list or dynamic list ^/
func TypeIsList(object);
```

```go
/^ Get whether object is a stream ^/
func TypeIsStream(object);
```

```go
/^ Get whether object is a dictionary or dynamic dictionary ^/
func TypeIsDictionary(object);
```

```go
/^ Get whether object is callable ^/
func TypeIsCallable(object);
```

```go
/^ Get whether object is a string ^/
func TypeIsString(object);
```

```go
/^ Get whether object is a number ^/
func TypeIsNumber(object);
```

```go
/^ Listen (creates application loop) ^/
func Net.Http.ListenSimpleWithLoop(server, port);
```

```go
/^ Create an http request ^/
func Net.Http.MakeRequest(url, $extra);
```

```go
/^ Url encode path ^/
func Net.Http.UrlPathEncode(path);
```

```go
/^ Url decode query param ^/
func Net.Http.UrlDecode(param);
```

```go
/^ Url encode query param ^/
func Net.Http.UrlEncode(param);
```

```go
/^ Get mimetype from extension ^/
func Net.Http.MimeType(ext);
```

```go
/^ Url decode path ^/
func Net.Http.UrlPathDecode(path);
```

```go
/^ Html encode ^/
func Net.Http.HtmlEncode(param);
```

```go
/^ Create a network stream ^/
func Net.NetworkStream(ipv6, datagram);
```

```go
/^ Get whether object is a double (not a long) ^/
func TypeIsDouble(object);
```

```go
/^ Clear renderer with renderer draw color ^/
func SDL2.RenderClear(renderer);
```

```go
/^ Init SDL2 ^/
func SDL2.Init();
```

```go
/^ Present frame (you are finished with the frame) ^/
func SDL2.RenderPresent(renderer);
```

```go
/^ Set SDL2 Renderer Draw Color ^/
func SDL2.SetRenderDrawColor(renderer, r, g, b, a);
```

```go
/^ Create a SDL2 Window ^/
func SDL2.CreateWindow(title, x, y, w, h, flags);
```

```go
/^ Get events ^/
func SDL2.PollEvent();
```

```go
/^ Fill a rectangle using SDL ^/
func SDL2.RenderFillRect(renderer, dictionary_with_x_y_w_h);
```

```go
/^ Draw a rectangle using SDL ^/
func SDL2.RenderDrawRect(renderer, dictionary_with_x_y_w_h);
```

```go
/^ Create a SDL2 Renderer ^/
func SDL2.CreateRenderer(window, );
```

```go
/^ Base64 encode ^/
func Crypto.Base64Encode(data);
```

```go
/^ Sha512 Algorithm ^/
func Crypto.Sha512($is384);
```

```go
/^ Sha256 Algorithm ^/
func Crypto.Sha256($is224);
```

```go
/^ Sha1 Algorithm (needed for WebSocket handshake/BitTorrent etc) (don't use unless you have no other choice) ^/
func Crypto.Sha1();
```

```go
/^ Base64 decode ^/
func Crypto.Base64Decode(str);
```

```go
/^ Create bytearray but with random bytes in it instead of zeros (this uses mbedtls by the way) ^/
func Crypto.RandomBytes(byteCount, personalString);
```

```go
/^ Hash passwords with PBKDF2 ^/
func Crypto.PBKDF2(pass, salt, itterations, keylen, shanum);
```

```go
/^ Get whether object is a long (not a double) ^/
func TypeIsLong(object);
```

```go
/^ Get whether object is not null or undefined ^/
func TypeIsDefined(object);
```

```go
/^ Eval source code ^/
func VM.Eval(source);
```

```go
/^ Load a crossvm executable ^/
func VM.LoadExecutable(stream);
```

```go
/^ Create root environment ^/
func VM.CreateEnvironment($dict);
```

```go
/^ Compile Source ^/
func VM.Compile(dict);
```

```go
/^ Get current environment for reflection purposes ^/
func VM.getCurrentEnvironment();
```

```go
/^ Get root environment for reflection purposes ^/
func VM.getRootEnvironment();
```

```go
/^ Get root environment as a dictionary ^/
func VM.getRootEnvironmentAsDictionary();
```

```go
/^ Get whether object is susceptible to garbage collection ^/
func TypeIsHeap(object);
```

```go
/^ Parse Long from String ^/
func ParseLong(arg, $base);
```

```go
/^ Parse Double from String ^/
func ParseDouble(arg);
```

```go
/^ Get a field in dictionary ^/
func Dictionary.GetField(dict, key);
```

```go
/^ Set a field in dictionary ^/
func Dictionary.SetField(dict, key, value);
```

```go
/^ Get Dictionary Item Enumerable for the each(item : Dictionary.Items(myDict)){item.Key; item.Value;} ^/
func Dictionary.Items(dictionary);
```

```go
/^ Get environment variable ^/
func Env.GetAt(key);
```

```go
/^ Get cache folder ^/
func Env.getCache();
```

```go
/^ Set environment variable ^/
func Env.SetAt(key, value);
```

```go
/^ Get downloads folder ^/
func Env.getDesktop();
```

```go
/^ Get platform name ^/
func Env.getPlatform();
```

```go
/^ Get documents folder ^/
func Env.getDocuments();
```

```go
/^ Get downloads folder ^/
func Env.getDownloads();
```

```go
/^ Get user folder ^/
func Env.getUser();
```

```go
/^ Get pictures folder ^/
func Env.getPictures();
```

```go
/^ Get music folder ^/
func Env.getMusic();
```

```go
/^ Get videos folder ^/
func Env.getVideos();
```

```go
/^ Get state folder ^/
func Env.getState();
```

```go
/^ Get the absolute path for executable ^/
func Env.GetRealExecutablePath(path);
```

```go
/^ Get config folder ^/
func Env.getConfig();
```

```go
/^ Get data folder ^/
func Env.getData();
```

```go
/^ Get whether object is a virtual filesystem ^/
func TypeIsVFS(object);
```

```go
/^ Create regex object ^/
func Regex(regex);
```

```go
/^ Create thread ^/
func Thread(callback);
```

```go
/^ Create bytearray with optional either size (to size it) or string argument (to fill byte array) ^/
func ByteArray($data);
```

```go
/^ Get type of object ^/
func TypeOf(object);
```

```go
/^ Create a Path from parts ^/
func Path.Create(relative, parts);
```

```go
/^ Create Absolute Root Path ^/
func Path.Root();
```

```go
/^ Create a Path from string ^/
func Path.FromString(path);
```

```go
/^ Stop the program with an optional error message ^/
func Console.Fatal($text);
```

```go
/^ Reads a byte from stdin ^/
func Console.Read();
```

```go
/^ Set whether terminal is sending signals for CTRL+C (true) or via read (false) ^/
func Console.setSignals(flag);
```

```go
/^ Get whether terminal is sending signals for CTRL+C (true) or via read (false) ^/
func Console.getSignals();
```

```go
/^ Write text "text" to stdout ^/
func Console.Write(text);
```

```go
/^ Reads line from stdin ^/
func Console.ReadLine();
```

```go
/^ Set whether terminal is buffering line by line (true) or byte by byte (false) ^/
func Console.setCanonical(flag);
```

```go
/^ Get whether terminal is buffering line by line (true) or byte by byte (false) ^/
func Console.getCanonical();
```

```go
/^ Set whether terminal is echoing characters read ^/
func Console.setEcho(flag);
```

```go
/^ Write text "text" to stdout with new line ^/
func Console.WriteLine(text);
```

```go
/^ Get whether terminal is echoing characters read ^/
func Console.getEcho();
```

```go
/^ Create in memory filesystem ^/
func FS.CreateMemoryFilesystem();
```

```go
/^ Create filesystem ^/
func FS.CreateFilesystem(fs);
```

```go
/^ Create stream ^/
func FS.CreateStream(strm);
```

```go
/^ Extract a crvm archive ^/
func FS.ExtractArchive(strm, vfs);
```

```go
/^ Create a memory stream ^/
func FS.MemoryStream(writable);
```

```go
/^ Create a subdir filesystem ^/
func FS.SubdirFilesystem(fs, subdir);
```

```go
/^ Create a mountable filesystem ^/
func FS.MountableFilesystem(root);
```

```go
/^ Write all text to file ^/
func FS.WriteAllText(fs, filename, content);
```

```go
/^ Read all text from file ^/
func FS.ReadAllText(fs, filename);
```

```go
/^ Create a crvm archive ^/
func FS.CreateArchive(fs, strm, name, version, info);
```

```go
/^ Make absolute path from relative path ^/
func FS.MakeFull(path);
```

```go
/^ Escape sql text ^/
func Sqlite.Escape(text);
```

```go
/^ Close sql database ^/
func Sqlite.Close(handle);
```

```go
/^ Execute sql (returns dictionary of columns key=value an error message as string or undefined) ^/
func Sqlite.Exec(handle, sql);
```

```go
/^ Opens the database (returns database handle or an error message as string or undefined) ^/
func Sqlite.Open(filename);
```

```go
/^ Serialize Json ^/
func Json.Encode(any, $indent);
```

```go
/^ Deserialize Json ^/
func Json.Decode(Json string);
```


