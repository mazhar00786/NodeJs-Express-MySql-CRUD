var express = require('express');

var router = express.Router();

var database = require('../database');

/* GET Record listing. */
router.get("/", function(request, response, next) {
    var query = "SELECT * FROM sample_data ORDER BY id DESC";

    database.query(query, function (error, data) {
        if (error) {
            throw error;
        } else {
            response.render('sample_data', {
                title: 'Node.js MySql CRUD Application', 
                action: 'list',
                sampleData: data,
            });
        }
    })
});

router.get("/add", function (request, response, next) {
    response.render('sample_data', {title: 'Insert Data into MySql', action: 'add'});
});

router.post('/add_data', function (request, respond, next) {
   var first_name = request.body.first_name;
   var last_name  = request.body.last_name;
   var age        = request.body.age;
   var gender     = request.body.gender;

   var query = `
       INSERT INTO sample_data (first_name, last_name, age, gender) 
       VALUE("${first_name}", "${last_name}", "${age}", "${gender}")
   `;

   database.query(query, function (error, data) {
       if (error) {
           throw error;
       } else {
           request.flash('success', {message: "Data Inserted Successfully."});
           respond.redirect('/sample_data')
       }
   });
});

router.get('/edit/:id', function (request, respond, next) {

    var id = request.params.id;
    var query = `SELECT * FROM sample_data WHERE id = "${id}"`;

    database.query(query, function (error, data) {
        if (error) {
            throw error;
        } else {
            respond.render('sample_data',  {title: 'Edit MySql Table Data', action: 'edit', sampleData: data[0]});            
        }
    })
});

router.post('/edit/:id', function (request, respond, next) {
    var id = request.params.id;
    var first_name = request.body.first_name;
    var last_name  = request.body.last_name;
    var age        = request.body.age;
    var gender     = request.body.gender;   

    var query = `
        UPDATE sample_data 
        SET first_name = "${first_name}", 
        last_name      = "${last_name}", 
        age            = "${age}", 
        gender         = "${gender}"
        WHERE id       = "${id}"
    `;   
    
    database.query(query, function (error, data) {
        if (error) {
            throw error;
        } else {
            request.flash('success', {message:"Data Updated Successfull."});
            respond.redirect('/sample_data')
        }
    })
});

router.get('/delete/:id', function (request, respond, next) {

    var id = request.params.id;

    var query = ` DELETE FROM sample_data WHERE id = "${id}" `;

    database.query(query, function (error, data) {
        if (error) {
            throw error;
        } else {
            request.flash('success', {message: "Record Deleted Successfully."});
            respond.redirect('/sample_data');            
        }
    })
});

module.exports = router;
