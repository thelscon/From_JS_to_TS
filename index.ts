class School {
    directions : Direction[] = []

    addDirection (direction : Direction) : void {
        this.directions.push (direction)
    }
}

class Direction {
    levels : Level[] = []

    get name () : string {
        return this._name
    }

    constructor (
        private _name : string) {}

    addLevel (level : Level) : void {
        this.levels.push (level)
    }
}

class Level {
    groups : Group[] = []

    get name () : string {
        return this._name
    }

    get program () : string {
        return this._program
    }

    constructor (
        private _name : string , 
        private _program : string) {}

    addGroup (group : Group) : void {
        this.groups.push (group)
    }
}

type predicateSortType <Type> = (a : Type , b : Type) => number
class ArrayOf <Type> extends Array <Type> {
    toSorted : (predicate ?: predicateSortType <Type>) => ArrayOf <Type>

    constructor (value ?: number | Array <Type>) {
        if (value) {
            if ( typeof value === 'number' )
                super (value) 
            else
                super (...value)
        }
        else {
            super ()
        }

        Object.defineProperty (this, 'toSorted' , {
            writable : true ,
            enumerable : false
        })
        this.toSorted = (predicate ?: predicateSortType <Type>) : ArrayOf <Type> => {
            const returnArray : ArrayOf <Type> = new ArrayOf
            returnArray.push ( ...this )
            return returnArray.sort (predicate)
        }
    }
}
class Group {
    private _students : ArrayOf <Student> = new ArrayOf

    get students () : ArrayOf <Student> {
        return this._students
    }

    constructor (
        public directionName : string , 
        public levelName : string) {}

    addStudent (student : Student) : void {
        this._students.push (student)
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

    constructor (
        public firstName : string , 
        public lastName : string , 
        public birthYear : number) {}

    setGrade (subject : string , grade : number) : void {
        this.grades [subject] = grade
    }

    markAttendance (present : boolean) : void {
        this.attendance.push (present)
    }

    getPerformanceRating () : number {
        const gradeValues : number[] = Object.values (this.grades)

        if (gradeValues.length === 0)
            return 0

        const averageGrade : number = gradeValues.reduce (
            (sum , grade) => sum + grade , 0
        ) / gradeValues.length

        const attendancePercentage : number = (
            this.attendance.filter (
                present => present
            ).length / this.attendance.length
        ) * 100

        return (averageGrade + attendancePercentage) / 2
    }
}