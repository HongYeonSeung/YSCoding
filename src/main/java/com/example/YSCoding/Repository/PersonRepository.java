package com.example.YSCoding.Repository;

import com.example.YSCoding.Entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}