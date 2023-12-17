package com.example.YSCoding.Repository;

import com.example.YSCoding.Entity.Bid;
import com.example.YSCoding.Entity.Signup;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findAllByBidderId(String bidderId);
}
