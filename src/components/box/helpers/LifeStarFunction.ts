export default function LifeStar (graphdata: any, xAxis: number) {
    let data = graphdata.series1[xAxis];
    let data_1 = graphdata.series1[xAxis + 1];
    let slope = graphdata.slopeSeries1[xAxis].slope;
    let wording;
    let description;
    let subDescription;
    let shortDescription;
    if (data >= -100 && data < 0){
        if (slope > 0){
            wording = 'ช่วงเริ่มต้นไปสู่มุ่งหน้า';
            description = 'กำลังเริ่มต้นบทใหม่ของชีวิต เป็นช่วงแห่งการเปลี่ยนเป็นคนใหม่ สร้างตัวตนใหม่' 
            + 'หรือการเริ่มต้นเส้นทางใหม่ที่เปลี่ยนแปลงไปสู่สิ่งที่มีความหมายและคุณค่ากับตัวเรามากขึ้น การค้นพบนี้อาจทำให้เกิดการเปลี่ยนแปลงบางอย่างเช่น' 
            + 'ย้ายสายงาน เปลี่ยนความสัมพันธ์ หรือเปลี่ยนเป้าหมายชีวิต อาจทำให้เกิดความรู้สึกไม่คุ้นเคย ไม่คุ้นชิน ก็ไม่เป็นไรนะ'
            + 'เพราะนี่คือช่วงที่เรากำลังเรียนรู้ สงสัย และทดลองทำสิ่งใหม่ ๆ ก้าวออกจาก Comfort Zone ของตัวเองอยู่';
            shortDescription = 'กำลังเริ่มต้นบทใหม่ของชีวิต เป็นช่วงแห่งการเปลี่ยนเป็นคนใหม่ สร้างตัวตนใหม่ หรือการเริ่มต้นเส้นทางใหม่ที่เปลี่ยนแปลงไปสู่สิ่งที่มีความหมายและคุณค่ากับตัวเรามากขึ้น  อาจทำให้เกิดความรู้สึกไม่คุ้นเคย ไม่คุ้นชิน ก็ไม่เป็นไรนะ เพราะนี่คือช่วงที่เรากำลังเรียนรู้ สงสัย และทดลองทำสิ่งใหม่ ๆ ก้าวออกจาก Comfort Zone ของตัวเองอยู่';
            subDescription = 'เป็นช่วงที่เหมาะกับการตั้งจิต เซ็ตความตั้งใจ ตั้งเป้าหมายใหม่ วางแผนและเตรียมตัวไปสู่สิ่งที่อยากมุ่งหน้าต่อไปในชีวิตของเรา \u003A\u0029'; 
        } else {
            wording = 'ช่วงทบทวนไปสู่การเริ่มต้น';
            description = 'ถึงเวลาต้องทบทวนชีวิตอีกครั้ง เป็นช่วงที่อาจจะได้เริ่มเพชิญกับความเบื่อ ความสับสน ไม่เป็นไรเลย เพราะมันถึงเวลาแล้วที่จะได้พัก '
            + 'และทบทวนเป้าหมาย ความเชื่อ การใช้ชีวิตของเรา สิ่งที่ทำมาอะไรใช่เราอะไรไม่ใช่ อะไรไปต่อ อะไรที่ไม่ตอบโจทย์ชีวิตแล้ว'; 
            shortDescription = 'ถึงเวลาต้องทบทวนชีวิตอีกครั้ง เป็นช่วงที่อาจจะได้เริ่มเพชิญกับความเบื่อ ความสับสน ไม่เป็นไรเลย เพราะมันถึงเวลาแล้วที่จะได้พัก และทบทวนเป้าหมาย ความเชื่อ การใช้ชีวิตของเรา สิ่งที่ทำมาอะไรใช่เราอะไรไม่ใช่ อะไรไปต่อ อะไรที่ไม่ตอบโจทย์ชีวิตแล้ว เป็นช่วงที่จะได้กลับมาใกล้ชิดกับตัวเองอีกครั้ง'
            subDescription = 'เป็นช่วงที่จะได้กลับมาใกล้ชิดกับตัวเองอีกครั้ง '
            + 'เพราะฉะนั้นอย่าลืมหาช่วงเวลาสงบสุขให้ได้ฟังเสียงของตัวเองมากขึ้น ทำงานกับตัวเองมากขึ้น เปิดโอกาสให้กับสิ่งใหม่ในชีวิต ในช่วงเวลาแบบนี้นะ '
            + 'เพราะเรากำลังทบทวนก่อนไปต่อเฟสใหม่ของชีวิตอยู่นั่นเอง \u003A\u0029'
        }
        
    } else if (data >= 0 && data <= 100){
        if (slope > 0){
            wording = 'ช่วงมุ่งหน้าไปสู่เต็มที่';
            description = 'นี่คือช่วงแห่งการมุ่งหน้าสู่เป้าหมายที่ตั้งไว้ เป็นช่วงที่ได้ลงมือทำ เต็มไปด้วยพลัง'
            + 'ความแน่วแน่และความสุขจากการเข้าใกล้เป้าหมายหรือความฝันของตัวเองทีละนิด แต่เส้นทางนี้ก็ต้องเจออุปสรรคเป็นธรรมดา'
            + 'หากรู้สึกเหนื่อยล้า ท้อแท้บ้างก็ไม่เป็นไรนะ อย่าเผลอเฆี่ยนตีตัวเอง ค่อย ๆ ก้าวไปทีละขั้น มองเป้าหมายเล็ก ๆ ที่ทำได้ไปเรื่อย ๆ เรียนรู้ผ่านความท้าทายต่าง ๆ  '
            + 'สำหรับใครที่ยังลองหลาย ๆ อย่างอยู่';
            shortDescription = 'นี่คือช่วงแห่งการมุ่งหน้าสู่เป้าหมายที่ตั้งไว้ เป็นช่วงที่ได้ลงมือทำ เต็มไปด้วยพลัง  แต่เส้นทางนี้ก็ต้องเจออุปสรรคเป็นธรรมดา  หากรู้สึกเหนื่อยล้า ท้อแท้บ้างก็ไม่เป็นไรนะ ค่อย ๆ ก้าวไปทีละขั้น มองเป้าหมายเล็ก ๆ ที่ทำได้ไปเรื่อย ๆ เรียนรู้ผ่านความท้าทายต่าง ๆ'
            subDescription = 'เป็นช่วงที่เหมาะกับการเริ่มเลือกโฟกัส ใครที่เลือกได้แล้ว พัฒนาจุดแข็งของตัวเอง และเผชิญหน้ากับปัญหาอย่างมั่นคง '
            + 'เพื่อค้นพบศักยภาพสูงสุดในสิ่งที่ตัวเองตั้งใจทำอยู่ \u003A\u0029';
        } else {
            wording = 'ช่วงเต็มที่ไปสู่การทบทวน';
            description = 'ยินดีด้วยสิ่งที่พยายามมาตลอด กำลังออกดอกออกผล ทักษะที่ได้ฝึกฝนมาเริ่มฉายแสง หรือถ้ายังก็ใกล้มาก ๆ แล้วแหละ เรียกได้ว่าเป็นช่วงพีคของชีวิตเลย  '
            + 'อะไรที่ติดค้างมานานก็จะปลดล็อก พบแสงสว่าง สิ่งที่ทำอยู่มีคนมองเห็นคุณค่า'
            shortDescription = 'ยินดีด้วยสิ่งที่พยายามมาตลอด กำลังออกดอกออกผล ทักษะที่ได้ฝึกฝนมาเริ่มฉายแสง หรือถ้ายังก็ใกล้มาก ๆ แล้วแหละ เรียกได้ว่าเป็นช่วงพีคของชีวิตเลย  อะไรที่ติดค้างมานานก็จะปลดล็อก พบแสงสว่าง สิ่งที่ทำอยู่มีคนมองเห็นคุณค่า  อย่าลืมขอบคุณตัวเองและคนรอบข้าง พร้อมให้รางวัลตัวเองสำหรับความพยายามที่ผ่านมานะ'
            subDescription = 'เป็นช่วงที่เหมาะกับการเก็บเกี่ยวผลสำเร็จ '
            + 'และแบ่งปันประสบการณ์หรือประโยชน์ที่คุณสะสมมาให้ผู้อื่น อย่าลืมขอบคุณตัวเองและคนรอบข้าง พร้อมให้รางวัลตัวเองสำหรับความพยายามที่ผ่านมา '
            + 'และอย่าลืมถอยกลับมาทบทวน เพื่อสร้างสมดุลระหว่างความสำเร็จและความสุขในชีวิตส่วนตัวนะ \u003A\u0029 ';

        }
        
    }
    return {wording, description, subDescription, shortDescription};
}