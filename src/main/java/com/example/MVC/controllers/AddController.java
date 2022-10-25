package com.example.MVC.controllers;

import com.example.MVC.entities.Contact;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddController {
    @GetMapping("/add")
    public boolean addContact(@RequestParam String name, @RequestParam String phone, @RequestParam String email,
                              @RequestParam String blogLink, @RequestParam String comment){
        ContactController.addContact(new Contact(name, phone, email, blogLink, comment));
        return true;
    }
}
