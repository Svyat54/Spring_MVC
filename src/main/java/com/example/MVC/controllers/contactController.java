package com.example.MVC.controllers;

import com.example.MVC.entities.Contact;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.LinkedList;

@Controller
public class contactController {
    private static LinkedList<Contact> contactList = new LinkedList<>();

    private int getNextId() {
        if (contactList.isEmpty()) return 0;
        else return contactList.getLast().getId() + 1;
    }
    private void addContact(Contact contact) {
        contact.setId(getNextId());
        contactList.add(contact);
    }

    public static LinkedList<Contact> getContactList() {
        return contactList;
    }

//    @GetMapping("/greeting")
//    public String greeting(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
//        model.addAttribute("name", name);
//        return "greeting";
//    }

    @GetMapping("/addContact") //http://localhost:8080/addContact
    public String addContact(@RequestParam String name, @RequestParam String phone, @RequestParam String email,
                             @RequestParam String blogLink, @RequestParam String comment, Model model){
        model.addAttribute("name", name);
        model.addAttribute("phone", phone);
        model.addAttribute("email", email);
        model.addAttribute("blogLink", blogLink);
        model.addAttribute("comment", comment);
        Contact.print(contactList);
        Contact contact = new Contact(name, phone, email, blogLink, comment);
        addContact(contact);
        model.addAttribute("listSize", contactList.size());
        Contact.print(contactList);
        return "contact";
    }

    public static int[] getIds(){
        int[] ids = new int[contactList.size()];
        for(int i = 0; i < ids.length; i++)
            ids[i] = contactList.get(i).getId();
        return ids;
    }

    public static Contact getContactById(int id) {
        return contactList.get(id);
    }

    public static void updateContact(Contact contact) {
        contactList.get(contact.getId()).setName(contact.getName());
        contactList.get(contact.getId()).setPhone(contact.getPhone());
        contactList.get(contact.getId()).setEmail(contact.getEmail());
        contactList.get(contact.getId()).setBlogLink(contact.getBlogLink());
        contactList.get(contact.getId()).setComment(contact.getComment());
    }
}
