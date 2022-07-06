const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

var express = require('express');
var router = express.Router();
module.exports = router; 



router.get('/', (req, res, next) => {
    Contact.find()
    .populate('group')
    .then(contactList => {
        res.status(200).json({
            message: 'Contacts fetched successfully',
            contacts: contactList
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Sorry, An error occured',
            error: error
        })
    })

 });

 //This method is called whenever an HTTP POST request is sent on the /contacts route.
 router.post('/', (req, res, next) => {
    const maxContacttId = sequenceGenerator.nextId("contacts");
  
    const contact = new Contact({
      id: maxContacttId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group
    });
  
    contact.save()
      .then(createdContact => {
        res.status(201).json({
          message: 'Contact added successfully',
          contact: createdContact
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });


  // This method is responsible for updating an existing contact in the database
  router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;
  
        Contact.updateOne({ id: req.params.id }, contact)
          .then(result => {
            res.status(204).json({
              message: 'Contact updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Contact not found.',
          error: { contact: 'Contact not found'}
        });
      });
  });


  // this method is responsible for deleting a contact
  router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        Contact.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Contact deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Contact not found.',
          error: { contact: 'Contact not found'}
        });
      });
  });