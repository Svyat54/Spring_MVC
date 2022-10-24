package com.example.MVC.controllers;

import com.example.MVC.entities.Contact;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class getContactController {
    private static int id;

    public static int getId() {
        return id;
    }

    @GetMapping("/getIds") //http://localhost:8080/getIds
    public HashMap<String, int[]> getIds(){
        HashMap<String, int[]> hash = new HashMap<>();
        hash.put("ids", contactController.getIds());
        return hash;
    }

    @GetMapping("/getContact")
    public Contact getContact(@RequestParam int contactId){
        id = contactId - 1;
        return contactController.getContactById(id);
    }
}
