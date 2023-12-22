var exp=require('express');

var mysql=require('mysql2');
var cor=require('cors');
var bp=require('body-parser');

var app=exp();

app.use(cor());
app.use(bp.json());

var conn=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "project_1"
})

conn.connect(function(err){
    if(!err)
        console.log("db connected");
    else
        console.log("db not connected");
})


app.listen(9000,function(){console.log("server started")});

app.post('/login',function(req,res){
    var user_name=req.body.user_name;
    var password=req.body.password;
    var query="SELECT * FROM user WHERE email ='"+user_name+"' and password='"+password+"'";
    console.log(query);
    conn.query(query,function(err,result){
            if(!err)
            {
                console.log(result);
                if(result.length>0)
                {
                    console.log(result[0].user_name);
                    res.send('true');
                }
                else 
                    res.send('false');
            }
            else
                res.send("failure")
    })
});

app.post('/updatepassword',function(req,res){
    var user_name=req.body.user_name;
    var new_password=req.body.new_password;
    var old_password=req.body.old_password;
    var query="update user set password='"+new_password +"' where email='"+user_name+"' and password='"+old_password+"'";
    conn.query(query,function(err){
        console.log(query);
            if(!err)
            {
                conn.query("select * from user where email='"+user_name+"' and password='"+new_password+"'",function(err,result1){
                    if(result1.length>0)
                    {
                        res.send("true");
                    }
                    else
                        res.send("false");
                });
                
            }
            else
                res.send("false");
    })
});

app.get('/home',function(req,res){
    var query="select * from service";
    conn.query(query,function(err,result){
            if(!err)
                res.json(result);
    })
});

app.get('/history',function(req,res){
    var query="select * from booking";
    conn.query(query,function(err,result){
            if(!err)
                res.json(result);
    })
});



app.post('/register',function(req,res){
	var user_name=req.body.user_name;
    var password=req.body.password;
    var contact=req.body.contact;
    var email=req.body.email;
    var query="insert into user(user_name,password,contact,email) values(?,?,?,?)";
    conn.query(query,[user_name,password,contact,email],function(err){
        if(!err)
        {
            conn.query("select * from user where email='"+user_name+"'",function(err,result1){
                if(result1.length>0)
                {
                    res.send("true");
                }
                else
                    res.send("false");
            });
        }
        else
            res.send("failure")
    })
});


app.all('*',function(req,res) {
	res.send("Wrong URL");
});