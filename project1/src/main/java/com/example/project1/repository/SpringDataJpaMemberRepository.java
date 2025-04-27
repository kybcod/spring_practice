package com.example.project1.repository;

import com.example.project1.domain.OldMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpringDataJpaMemberRepository extends JpaRepository<OldMember, Long>, OldMemberRepository {

    @Override
    Optional<OldMember> findByName(String name);

}
