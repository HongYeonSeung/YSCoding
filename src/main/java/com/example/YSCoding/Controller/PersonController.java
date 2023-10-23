package com.example.YSCoding.Controller;

import com.example.YSCoding.Entity.Person;
import com.example.YSCoding.Repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class PersonController {
    private final PersonRepository personRepository;
    @PostMapping("/users/save")
    public void personSave(@RequestBody Person person) {
        personRepository.save(person);
    }
}

// DB 코드