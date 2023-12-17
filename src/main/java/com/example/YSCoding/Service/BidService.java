package com.example.YSCoding.Service;

import com.example.YSCoding.Entity.Bid;
import com.example.YSCoding.Repository.BidRepository;
import com.example.YSCoding.Repository.SignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {
    private final BidRepository bidRepository;

    @Autowired
    public BidService(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    public List<Bid> getUnsuccessfulBidsProducts(String username) {
        return bidRepository.findAllByBidderId(username);
    }
}
