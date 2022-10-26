package com.example.MVC.controllers;

import com.example.MVC.entities.Contact;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;

@RestController
public class NameController {
    @GetMapping("/getName")
    public LinkedList<Contact> name(@RequestParam String name){
        return ContactController.getSelectName(name);
    }
}
