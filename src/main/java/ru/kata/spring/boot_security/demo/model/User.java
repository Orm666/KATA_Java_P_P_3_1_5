package ru.kata.spring.boot_security.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(name = "email")
    private String username;
    private Byte age;
    private String password;
    @ManyToMany()
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public User() {
    }

    public User(String firstName, String lastName, String email, Byte age, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = email;
        this.age = age;
        this.password = password;
    }

    public void addRoleToUser(Role role) {
        if (roles == null) {
            roles = new HashSet<>();
        }
        roles.add(role);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return username;
    }

    public void setEmail(String email) {
        this.username = email;
    }

    public Byte getAge() {
        return age;
    }

    public void setAge(Byte age) {
        this.age = age;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String getUsername() {
        return username;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", age=" + age +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                '}';
    }
}
