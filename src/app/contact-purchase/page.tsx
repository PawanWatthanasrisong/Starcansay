import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function ContactPurchase() {
  return (
    <div className='w-full'>
      <div className='flex flex-col h-screen bg-starcansayblue justify-center items-center font-thai text-base md:text-xl text-white text-center'>
          <Image src='/images/star-charactor-41.png' alt='starcansay-logo' className='w-[268px]' width={268} height={268} />
          <p>ขออภัย ขณะนี้ไม่สามารถแสดงข้อมูลของคุณได้</p>
          <p>
          <span>กรุณาติดต่อ Line@: @starcansay หรือ </span>
          <span>
            <Link href='https://line.me/R/ti/p/%40starcansay' className='underline whitespace-nowrap' target='_blank' rel='noopener noreferrer'>
                กดลิงก์ที่นี่เพื่อติดต่อ
            </Link>
          </span>

          </p>
          <p>เพื่อขอรับการตรวจสอบ ขอบคุณสำหรับความเข้าใจค่ะ</p>

      </div>
    </div>
  );

} 