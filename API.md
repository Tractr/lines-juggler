## Classes

<dl>
<dt><a href="#Lines">Lines</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ReplaceInlineCallback">ReplaceInlineCallback</a> ⇒ <code>string</code></dt>
<dd><p>Callback for string replacement</p>
</dd>
</dl>

<a name="Lines"></a>

## Lines
**Kind**: global class  

* [Lines](#Lines)
    * [new Lines(content)](#new_Lines_new)
    * [.get()](#Lines+get) ⇒ <code>string</code>
    * [.changed()](#Lines+changed) ⇒ <code>boolean</code>
    * [.length()](#Lines+length) ⇒ <code>number</code>
    * [.contains(search, start, end)](#Lines+contains) ⇒ <code>boolean</code>
    * [.count(search, start, end)](#Lines+count) ⇒ <code>number</code>
    * [.index(search, start, end)](#Lines+index) ⇒ <code>number</code> \| <code>null</code>
    * [.indexes(search, start, end)](#Lines+indexes) ⇒ <code>Array.&lt;number&gt;</code>
    * [.before(search, insert, start, end)](#Lines+before) ⇒ [<code>Lines</code>](#Lines)
    * [.after(search, insert, start, end)](#Lines+after) ⇒ [<code>Lines</code>](#Lines)
    * [.append(insert)](#Lines+append) ⇒ [<code>Lines</code>](#Lines)
    * [.prepend(insert)](#Lines+prepend) ⇒ [<code>Lines</code>](#Lines)
    * [.remove(search, length, start, end)](#Lines+remove) ⇒ [<code>Lines</code>](#Lines)
    * [.replaceInline(search, replace, start, end)](#Lines+replaceInline) ⇒ [<code>Lines</code>](#Lines)

<a name="new_Lines_new"></a>

### new Lines(content)
Build an instance from a content

**Throws**:

- <code>Error</code> If content is not a string


| Param | Type |
| --- | --- |
| content | <code>string</code> | 

<a name="Lines+get"></a>

### lines.get() ⇒ <code>string</code>
Get lines as a string

**Kind**: instance method of [<code>Lines</code>](#Lines)  
<a name="Lines+changed"></a>

### lines.changed() ⇒ <code>boolean</code>
Denotes if the content has been changed

**Kind**: instance method of [<code>Lines</code>](#Lines)  
<a name="Lines+length"></a>

### lines.length() ⇒ <code>number</code>
Get the current number of lines

**Kind**: instance method of [<code>Lines</code>](#Lines)  
<a name="Lines+contains"></a>

### lines.contains(search, start, end) ⇒ <code>boolean</code>
Denotes if the data contains a string

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| search | <code>string</code> \| <code>RegExp</code> |  |  |
| start | <code>number</code> | <code>0</code> | First line to process |
| end | <code>number</code> \| <code>null</code> | <code></code> | Line to stop process (not included, null => until end) |

<a name="Lines+count"></a>

### lines.count(search, start, end) ⇒ <code>number</code>
Count how much lines match the search

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| search | <code>string</code> \| <code>RegExp</code> |  |  |
| start | <code>number</code> | <code>0</code> | First line to process |
| end | <code>number</code> \| <code>null</code> | <code></code> | Line to stop process (not included, null => until end) |

<a name="Lines+index"></a>

### lines.index(search, start, end) ⇒ <code>number</code> \| <code>null</code>
Get the index of the first matching line

**Kind**: instance method of [<code>Lines</code>](#Lines)  
**Returns**: <code>number</code> \| <code>null</code> - Return null if not found  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| search | <code>string</code> \| <code>RegExp</code> |  |  |
| start | <code>number</code> | <code>0</code> | First line to process |
| end | <code>number</code> \| <code>null</code> | <code></code> | Line to stop process (not included, null => until end) |

<a name="Lines+indexes"></a>

### lines.indexes(search, start, end) ⇒ <code>Array.&lt;number&gt;</code>
Get the indexes of the matching lines

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| search | <code>string</code> \| <code>RegExp</code> |  |  |
| start | <code>number</code> | <code>0</code> | First line to process |
| end | <code>number</code> \| <code>null</code> | <code></code> | Line to stop process (not included, null => until end) |

<a name="Lines+before"></a>

### lines.before(search, insert, start, end) ⇒ [<code>Lines</code>](#Lines)
Insert a content before a line

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| search | <code>string</code> \| <code>RegExp</code> |  |  |
| insert | <code>string</code> |  |  |
| start | <code>number</code> | <code>0</code> | First line to process |
| end | <code>number</code> \| <code>null</code> | <code></code> | Line to stop process (not included, null => until end) |

<a name="Lines+after"></a>

### lines.after(search, insert, start, end) ⇒ [<code>Lines</code>](#Lines)
Insert a content after a line

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| search | <code>string</code> \| <code>RegExp</code> |  |  |
| insert | <code>string</code> |  |  |
| start | <code>number</code> | <code>0</code> | First line to process |
| end | <code>number</code> \| <code>null</code> | <code></code> | Line to stop process (not included, null => until end) |

<a name="Lines+append"></a>

### lines.append(insert) ⇒ [<code>Lines</code>](#Lines)
Insert a block at the end of the content

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type |
| --- | --- |
| insert | <code>string</code> | 

<a name="Lines+prepend"></a>

### lines.prepend(insert) ⇒ [<code>Lines</code>](#Lines)
Insert a block at the beginning of the content

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type |
| --- | --- |
| insert | <code>string</code> | 

<a name="Lines+remove"></a>

### lines.remove(search, length, start, end) ⇒ [<code>Lines</code>](#Lines)
Remove lines that match the pattern

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| search | <code>string</code> \| <code>RegExp</code> |  |  |
| length | <code>number</code> | <code>1</code> |  |
| start | <code>number</code> | <code>0</code> | First line to process |
| end | <code>number</code> \| <code>null</code> | <code></code> | Line to stop process (not included, null => until end) |

<a name="Lines+replaceInline"></a>

### lines.replaceInline(search, replace, start, end) ⇒ [<code>Lines</code>](#Lines)
Replace content within a line

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| search | <code>string</code> \| <code>RegExp</code> |  |  |
| replace | <code>string</code> \| [<code>ReplaceInlineCallback</code>](#ReplaceInlineCallback) |  |  |
| start | <code>number</code> | <code>0</code> | First line to process |
| end | <code>number</code> \| <code>null</code> | <code></code> | Line to stop process (not included, null => until end) |

<a name="ReplaceInlineCallback"></a>

## ReplaceInlineCallback ⇒ <code>string</code>
Callback for string replacement

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| substring | <code>string</code> | 
| ...args | <code>Array.&lt;any&gt;</code> | 

