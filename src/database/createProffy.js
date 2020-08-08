module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    
    // Insert into proffys

    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `);    

    const proffyId = insertedProffy.lastID;

    // Insert into classes

    const insertedClass =  await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffyId}"
        );
    `);

    const classId = insertedClass.lastID;

    // Insert into class_schedule

    const insertedAllClassScheduleValues = classScheduleValues.map((value) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${classId}",
                "${value.weekday}",
                "${value.time_from}",
                "${value.time_to}"
            );
        `);
    });

    //await Promise.all(insertedAllClassScheduleValues);
    

    const selectedProffys = await db.all("SELECT * FROM proffys");
    //console.log(selectedProffys);

    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.* FROM proffys JOIN classes ON 
        (classes.proffy_id = proffys.id) WHERE classes.proffy_id = 1;
    `);

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.* FROM class_schedule WHERE class_schedule.class_id = 1 
        AND class_schedule.weekday = 0 
        AND class_schedule.time_from <= 620 
        AND class_schedule.time_to > 520;
    `);

    console.log(selectClassesSchedules);

}