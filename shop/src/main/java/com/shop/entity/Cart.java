package com.shop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "cart")
@Getter @Setter
@ToString
public class Cart {

    @Id
    @Column(name = "cart_id")
    @GeneratedValue(strategy = GenerationType.AUTO)// AUTO	JPA가 DB 방언(Dialect)에 맞춰 자동 선택 (H2, MySQL → IDENTITY, Oracle → SEQUENCE)
                                                        //IDENTITY	DB의 AUTO_INCREMENT 기능 사용 (MySQL, PostgreSQL 등)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

//    @ManyToOne
//    @JoinColumn(name = "item_id")
//    private Item item;
}
