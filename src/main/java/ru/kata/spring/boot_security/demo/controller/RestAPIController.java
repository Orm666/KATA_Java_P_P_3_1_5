package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestAPIController {
    private final UserService userService;
    private final RoleService roleService;


    @Autowired
    public RestAPIController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {

        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<HttpStatus> saveUser(@RequestBody User user) {
        userService.save(user); //Передавать в roles только id
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/users")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody User user) {
        userService.update(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> removeUser(@PathVariable Long id) {
        userService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles() {

        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

    @GetMapping("/userAuth")
    public ResponseEntity<User> getUserAuth(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
