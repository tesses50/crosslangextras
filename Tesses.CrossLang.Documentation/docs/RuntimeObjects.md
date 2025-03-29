# CrossLang Runtime Objects (this and the root dictionaries are implcit) Documentation
```go
/^ Get index of string or char in string returns -1 if not found ^/
func String.IndexOf(this, textOrChr);
```

```go
/^ Get index of string or char in string returns -1 if not found ^/
func String.LastIndexOf(this, textOrChr);
```

```go
/^ Get the enumerator  ^/
func String.GetEnumerator(this, textOrChr);
```

```go
/^ Get the substring of a string if length is not provided it spans the rest of the string provided by this ^/
func String.Substring(this, textOrChr);
```

```go
/^ Remove text from a string if length is not provided it spans the rest of the string provided by this ^/
func String.Remove(this, textOrChr);
```

```go
/^ Trim the start of string till char is not chr if chr is not provided space will be used ^/
func String.TrimStart(this, textOrChr);
```

```go
/^ Trim the end of string till char is not chr if chr is not provided space will be used ^/
func String.TrimEnd(this, textOrChr);
```

```go
/^ Escape a crosslang string for eval quote determines whether the string should be quoted or not by default not ^/
func String.Escape(this, textOrChr);
```


