package com.example.MVC.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeleteContactController {
    @GetMapping("/delete")
    public boolean deleteContact(@RequestParam int id){
        return ContactController.deleteContact(id);
    }
}
