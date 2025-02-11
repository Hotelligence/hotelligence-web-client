"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";
import AddToButton from "../buttons/addToButton";

export default function ComparisonTable({ rooms = [] }) {
  const [displayColumns, setDisplayColumns] = useState([null, null, null]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDisplayColumns(
      Array(3)
        .fill(null)
        .map((_, index) => rooms[index] || null)
    );
    setIsLoading(false);
  }, [rooms]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full">Loading...</div>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <div className="flex justify-center items-center w-full">
        <AddToButton label="Thêm vào so sánh" href={`/`} />
      </div>
    );
  }

  const criteriaNames = [
    "Tên phòng",
    "Loại phòng",
    "Số giường",
    "Loại giường",
    "Số lượng người lớn tối đa",
    "Số lượng trẻ em tối đa",
    "Mô tả",
    "Tiện nghi",
    "Tiện ích bổ sung",
    "Giá gốc",
    "Chiết khấu",
    "Tạm tính",
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    return originalPrice * (1 - discountPercentage / 100);
  };

  const formatAmenities = (amenities) => {
    if (!amenities) return "";
    return amenities.map(amenity => 
      `${amenity.amenityType}: ${amenity.amenityName.join(', ')}`
    ).join('\n');
  };

  const formatExtraOptions = (extraOptions) => {
    if (!extraOptions) return "";
    return extraOptions.map(option => option.optionName).join(', ');
  };

  return (
    <>
      <Table hideHeader>
        <TableHeader>
          <TableColumn></TableColumn>
          {displayColumns.map((_, index) => (
            <TableColumn key={index}></TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="justify-items-center">
                {room ? (
                  room.images &&
                  room.images[0] && (
                    <Image
                      src={room.images[0]}
                      alt={room.roomType}
                      width={300}
                      height={500}
                    />
                  )
                ) : rooms[0]?.hotelId ? (
                  <AddToButton
                    label="Thêm vào so sánh"
                    href={`/hotelDetails/${rooms[0].hotelId}`}
                  />
                ) : (
                  <AddToButton label="Thêm vào so sánh" href={`/`} />
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[0]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {room?.roomName || ""}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[1]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {room?.roomType || ""}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[2]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {room?.numOfBeds || ""}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[3]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {room?.bedType || ""}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[4]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {room?.maxAdults || ""}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[5]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {room?.maxChildren || ""}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[6]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {room?.description || ""}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[7]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center whitespace-pre-line">
                {formatAmenities(room?.amenities)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[8]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {formatExtraOptions(room?.extraOptions)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[9]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {room ? formatPrice(room.originPrice) : ""}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[10]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {room ? `${room.discountPercentage}%` : ""}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <h5 className="text-[var(--primary-gold-120)]">
                {criteriaNames[11]}
              </h5>
            </TableCell>
            {displayColumns.map((room, index) => (
              <TableCell key={index} className="body2 text-center">
                {room
                  ? formatPrice(
                      calculateDiscountedPrice(
                        room.originPrice,
                        room.discountPercentage
                      )
                    )
                  : ""}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

ComparisonTable.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomType: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      numOfBeds: PropTypes.number,
      bedType: PropTypes.string,
      maxAdult: PropTypes.number,
      maxChildren: PropTypes.number,
      originPrice: PropTypes.number,
      discountPercentage: PropTypes.number,
    })
  ),
};
