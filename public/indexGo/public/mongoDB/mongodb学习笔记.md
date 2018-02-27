
### 插入数据
```
use test
db.col.insert({name:"guoyuefei",firstname:"guo",age:22})
```





### 更新数据

##### update（）
```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)

```
+ query : update的查询条件，类似sql update查询内where后面的。
+ update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
+ upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
+ multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
writeConcern :可选，抛出异常的级别。


实例：
```
db.col1.update(
  {name:"guoyuefei"},
  {$set:{name:"guoyuefei++"}},
  {multi:true})

返回结果：
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

##### save() 方法
save() 方法通过传入的文档来替换已有文档。语法格式如下：
```
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```
说明:
+ document : 文档数据。
+ writeConcern :可选，抛出异常的级别。

实例（网上的）：

```
以下实例中我们替换了 _id 为 56064f89ade2f21f36b03136 的文档数据：
db.col.save({
	"_id" : ObjectId("56064f89ade2f21f36b03136"),
    "title" : "MongoDB",
    "description" : "MongoDB 是一个 Nosql 数据库",
    "by" : "Runoob",
    "url" : "http://www.runoob.com",
    "tags" : [
            "mongodb",
            "NoSQL"
    ],
    "likes" : 110
})
```

更多实例：
```
更多实例
只更新第一条记录：
db.col.update( { "count" : { $gt : 1 } } , { $set : { "test2" : "OK"} } );
全部更新：
db.col.update( { "count" : { $gt : 3 } } , { $set : { "test2" : "OK"} },false,true );
只添加第一条：
db.col.update( { "count" : { $gt : 4 } } , { $set : { "test5" : "OK"} },true,false );
全部添加加进去:
db.col.update( { "count" : { $gt : 5 } } , { $set : { "test5" : "OK"} },true,true );
全部更新：
db.col.update( { "count" : { $gt : 15 } } , { $inc : { "count" : 1} },false,true );
只更新第一条记录：
db.col.update( { "count" : { $gt : 10 } } , { $inc : { "count" : 1} },false,false );

```

##### remove() 方法的基本语法格式如下所示：

```
db.collection.remove(
   <query>,
   <justOne>
)
```

如果你的 MongoDB 是 2.6 版本以后的，语法格式如下：
```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)

```
参数说明：
+ query :（可选）删除的文档的条件。
+ justOne : （可选）如果设为 true 或 1，则只删除一个文档。
+ writeConcern :（可选）抛出异常的级别。



##### MongoDB 查询数据的语法格式如下：
```
db.collection.find(query, projection)
```
+ query ：可选，使用查询操作符指定查询条件
+ projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：
```


>db.col.find().pretty()
pretty() 方法以格式化的方式来显示所有文档。
实例
以下实例我们查询了集合 col 中的数据：
> db.col.find().pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```

除了 find() 方法之外，还有一个 findOne() 方法，它只返回一个文档。


MongoDB 与 RDBMS Where 语句比较
如果你熟悉常规的 SQL 数据，通过下表可以更好的理解 MongoDB 的条件语句查询：


记忆提示
+ $lt=less than
+ $gt=greater than
+ $lte = less than equal

|操作	|格式	|范例	|RDBMS中的类似语句|
|---|---|----|---|
|等于	|{<key>:<value>} |db.col.find({"by":"菜鸟教程"}).pretty()|	where by = '菜鸟教程'|
|小于	|{<key>:{$lt:<value>}}|	db.col.find({"likes":{$lt:50}}).pretty()	|where likes < 50
|小于或等于	|{<key>:{$lte:<value>}}	|db.col.find({"likes":{$lte:50}}).pretty()	|where likes <= 50|
|大于	|{<key>:{$gt:<value>}}	|db.col.find({"likes":{$gt:50}}).pretty()	|where likes > 50|
|大于或等于	|{<key>:{$gte:<value>}}	|db.col.find({"likes":{$gte:50}}).pretty()	|where likes >= 50|
|不等于	|{<key>:{$ne:<value>}}	|db.col.find({"likes":{$ne:50}}).pretty()	|where likes != 50|

MongoDB AND 条件
```
MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开，及常规 SQL 的 AND 条件。
语法格式如下：
>db.col.find({key1:value1, key2:value2}).pretty()
```

MongoDB OR 条件
MongoDB OR 条件语句使用了关键字 $or,语法格式如下：
```
db.col.find(
   {
      $or: [
	     {key1: value1}, {key2:value2}
      ]
   }
).pretty()

```
实例
```
>db.col.find({$or:[{"by":"菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```
AND 和 OR连用
实例
```
>db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}

```



