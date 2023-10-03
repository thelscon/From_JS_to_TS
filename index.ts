class School {
    directions : Direction[] = []

    addDirection (direction : Direction) : void {
        this.directions.push (direction)
    }
}

class Direction {
    #_name : string 
    levels : Level[] = []

    get name () : string {
        return this.#_name
    }

    constructor (name : string) {
        this.#_name = name ;
    }

    addLevel (level : Level) : void {
        this.levels.push (level)
    }
}

class Level {
    #_name : string
    #_program : string
    groups : Group[] = []

    get name () : string {
        return this.#_name
    }

    get program () : string {
        return this.#_program
    }

    constructor (name : string , program : string) {
        this.#_name = name
        this.#_program = program
    }

    addGroup (group : Group) : void {
        this.groups.push (group)
    }
}

type predicateSortType <Type> = (a : Type , b : Type) => number
class ArrayOf <Type> extends Array <Type> {
    toSorted (predicate ?: predicateSortType <Type>) : ArrayOf <Type> {
        return this.sort (predicate)
    }
}
class Group {
    #_students : ArrayOf <Student> = new ArrayOf
    directionName : string
    levelName : string

    get students () : ArrayOf <Student> {
        return this.#_students
    }

    constructor (directionName : string , levelName : string) {
        this.directionName = directionName
        this.levelName = levelName
    }

    addStudent (student : Student) : void {
        this.#_students.push (student)
    }

    showPerformance () : ArrayOf <Student> {
        const sortedStudents = this.students.toSorted (
            (a , b) => b.getPerformanceRating () - a.getPerformanceRating ()
        )

        return sortedStudents
    }
}

interface IGrade {
    [subject : string] : number
}
class Student {
    firstName : string
    lastName : string
    birthYear : number

    grades : IGrade = {}
    attendance : boolean[] = []

    get fullName () : string {
        return `${this.lastName} ${this.firstName}`
    }

    set fullName (value : string) {
        const RE = /^([a-zA-Z']+)\s{1}([a-zA-Z']+)$/i ;
        if ( RE.test ( value ) )
            [this.lastName , this.firstName] = value.split (' ')
    }

    get age () : number {
        return new Date ().getFullYear () - this.birthYear
    }

    constructor (firstName : string , lastName : string , birthYear : number) {
        this.firstName = firstName
        this.lastName = lastName
        this.birthYear = birthYear
    }

    setGrade (subject : string , grade : number) : void {
        this.grades [subject] = grade
    }

    markAttendance (present : boolean) : void {
        this.attendance.push (present)
    }

    getPerformanceRating () : number {
        const gradeValues = Object.values (this.grades)

        if (gradeValues.length === 0)
            return 0

        const averageGrade = gradeValues.reduce (
            (sum , grade) => sum + grade , 0
        ) / gradeValues.length

        const attendancePercentage = (
            this.attendance.filter (
                present => present
            ).length / this.attendance.length
        ) * 100

        return (averageGrade + attendancePercentage) / 2
    }
}