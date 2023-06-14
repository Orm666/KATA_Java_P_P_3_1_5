package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Service
public class UserServiceImp implements UserService {

    private UserDao userDao;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setUserDao(UserDao userDao, @Lazy PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @Transactional
    @Override
    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userDao.findById(id).get(); //getById не работает
    }

    @Transactional
    @Override
    public void update(User user) {
        if (!user.getPassword().contains("$2a$10$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userDao.save(user);
    }

    @Transactional
    @Override
    public void remove(Long id) {
        userDao.deleteById(id);
    }


}
