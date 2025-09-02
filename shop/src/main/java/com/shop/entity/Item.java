package com.shop.entity;

import com.shop.constant.ItemSellStatus;
import com.shop.dto.ItemFormDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "item")
@Getter
@Setter
@ToString
public class Item extends BaseEntity{
    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                            //상품 코드

    @Column(nullable = false, length = 50)
    private String itemNm;                      //상품명

    @Column(nullable = false)
    private int price;                          //가격

    @Column(nullable = false)
    private int stockNumber;                    //재고수량

    @Lob    //긴 문자열
    @Column(nullable = false)
    private String itemDetail;                  //상품 상세 설명

    @Enumerated(EnumType.STRING)
    private ItemSellStatus itemSellStatus;      //상품 판매 상태

    private LocalDateTime regTime;              //등록시간

    private LocalDateTime updateTime;           //수정 시간

    public void updateItem(ItemFormDto itemFormDto){
        this.itemNm = itemFormDto.getItemNm();
        this.price = itemFormDto.getPrice();
        this.itemDetail = itemFormDto.getItemDetail();
        this.stockNumber = itemFormDto.getStockNumber();
        this.itemSellStatus = itemFormDto.getItemSellStatus();
    }
}
