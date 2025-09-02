package com.shop.repository;

import com.querydsl.core.BooleanBuilder;
import com.shop.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long>, QuerydslPredicateExecutor<Item>, ItemRepositoryCustom{

    //Select From ItemNm 이랑 같은 역할 findByItemNm
    List<Item> findByItemNm(String itemNm);

    List<Item> findByItemNmOrItemDetail(String itemNm, String itemDetail);

    List<Item> findByPriceLessThan(int price);

    List<Item> findByPriceLessThanOrderByPriceDesc(int price);

    @Query("select i from Item i where i.itemDetail like %:itemDetail% order by i.price desc ")
    List<Item> findByItemDetail(@Param("itemDetail") String itemDetail);

    @Query(value = "select * from item i where i.item_detail like %:itemDetail% order by i.price desc ", nativeQuery = true)
    List<Item> findByItemDetailNativeQuery(@Param("itemDetail") String itemDetail);
}
