package com.example.MVC.controllers;

import com.example.MVC.entities.Contact;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class updateContactController {
    @GetMapping("/update")
    public String updateContact(@RequestParam String name, @RequestParam String phone, @RequestParam String email,
                                @RequestParam String blogLink, @RequestParam String comment) {
        Contact.print(contactController.getContactList());
        Contact contact = new Contact(name, phone, email, blogLink, comment);
        contact.setId(getContactController.getId());
        System.out.println(contact.string());
        contactController.updateContact(contact);
        return "contact updated";
    }
}
