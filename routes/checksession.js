var nodemailer = require("nodemailer");
var ejs = require("ejs");


exports.validate=function(req,res)
{
	console.log("ajax is called here");
	
	//var product_name=req.body.name;
	//var product_rate=req.body.rate;
	var Name = req.body.product.Name;
	var Rate=req.body.product.Rate;
	if(req.session.data)
		{
	req.session.data.push({Name:Name,Rate:Rate});
	console.log(JSON.stringify(req.body.product));
		}
	else
		{
			req.session.data = [{Name:Name,Rate:Rate}];
		}
		
	//var p = req.session.prod_name;
	//console.log(JSON.stringify(req.session.data));
	//var r= req.session.prod_rate;
	
	res.send(req.session.data);
	


}

exports.show=function(req,res)
{
	
	res.send(req.session.data);
	console.log("in show" + JSON.stringify(req.session));
	
}

exports.confirmOrder = function(req,res) {
	var total=0;

	for (i=0;i<req.session.data.length;i++){
		var rate1 = req.session.data[i].Rate;
		total+= rate1;

	}

	console.log("Confirm order==>"+JSON.stringify(req.session.data)+" Total:"+total);
	var smtpConfig = {
		host: 'smtp.gmail.com',
		port: 25,
		secure: false, // use SSL
		domains: ["gmail.com", "googlemail.com"],
		auth: {
			user: 'restroeat@gmail.com',
			pass: 'Restro12345'
		}
	};

// create reusable transporter object using the default SMTP transport 
	var transporter = nodemailer.createTransport(smtpConfig);

// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: 'restroeat@gmail.com', // sender address
		to: req.session.username, // list of receivers
		subject: 'RESTRO-EAT ORDER CONFIRMATION', // Subject line
		//text: 'Your order is confirmed : Your order as follows:Confirm order==>'+JSON.stringify(req.session.data)+" Total:"+total, // plaintext body
		//html: '<b>Thank you for your order?</b>' // html body
		html: '<b>Your order is confirmed : Your order as follows:Confirm order==>' +JSON.stringify(req.session.data)+  'Total:'+total	};

// send mail with defined transport object 
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
}
exports.newOrder = function(req,res){

	req.session.data = [];
	res.send(req.session.data);
	console.log("new Order" + JSON.stringify(req.session));
}
exports.logout = function(req,res){

	req.session.destroy();
	res.redirect('../../signin');

	}



exports.remove=function(req,res)
{
	console.log("ajax is called here");
	
	//var product_name=req.body.name;
	//var product_rate=req.body.rate;
	var Name = req.body.product.Name;
	var Rate=req.body.product.Rate;
	if(req.session.data)
		{
	req.session.data.pop(req.body.product);
	console.log(JSON.stringify(req.session.data));
		}
	
		
	//var p = req.session.prod_name;
	//console.log(JSON.stringify(req.session.data));
	//var r= req.session.prod_rate;
	
	res.send(req.session.data);
	
	/*var arr = [];
	arr.push(anu);
	
	console.log(arr);*/
	
	//res.render('index' , {cart : anu});
	
	//console.log(product_name);
	//console.log(product_rate);

}