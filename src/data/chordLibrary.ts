export interface ChordLibrary {
  letters: Record<string, string[]>;
  chords: Record<string, string[]>;
  trigrams: Record<string, string[]>;
  lexical: Record<string, string[]>;
  all: Record<string, string[]>;
}

export const chordLibrary: ChordLibrary = {
  letters: {
    a: ['317-57'],
    b: ['316-180'],
    c: ['214-146'],
    d: ['303-146'],
    e: ['194-82'],
    f: ['296-121'],
    g: ['187-180'],
    h: ['333-121'],
    i: ['169-18'],
    j: ['407-18'],
    k: ['243-121'],
    l: ['371-19'],
    m: ['207-121'],
    n: ['377-44'],
    o: ['140-44'],
    p: ['304-110'],
    q: ['323-204'],
    r: ['223-56'],
    s: ['446-60'],
    t: ['324-82'],
    u: ['71-60'],
    v: ['215-110'],
    w: ['224-179'],
    x: ['323-168'],
    y: ['439-35'],
    z: ['194-204'],
  },
  chords: {
    about: ['317-57', '316-180', '140-44', '71-60'],
    above: ['317-57', '316-180', '140-44', '215-110', '194-82'],
    add: ['317-57', '303-146'],
    again: ['317-57', '187-180', '169-18', '377-44'],
    air: ['317-57', '169-18', '223-56'],
    all: ['317-57', '371-19'],
    almost: ['317-57', '371-19', '207-121'],
    along: ['317-57', '371-19', '140-44', '187-180'],
    also: ['317-57', '371-19', '140-44'],
    always: ['317-57', '371-19', '224-179', '439-35'],
    America: ['317-57', '207-121', '500-62', '40-62'],
    an: ['317-57', '377-44'],
    and: ['317-57', '377-44', '303-146'],
    animal: ['317-57', '377-44', '169-18', '207-121'],
    another: ['317-57', '377-44', '140-44', '333-121'],
    answer: ['317-57', '377-44', '446-60', '224-179', '223-56'],
    any: ['317-57', '377-44', '101-35'],
    are: ['317-57', '223-56'],
    around: ['317-57', '223-56', '140-44', '71-60'],
    as: ['317-57', '446-60'],
    ask: ['317-57', '446-60', '243-121'],
    at: ['317-57', '194-82'],
    away: ['317-57', '224-179', '353-179', '439-35'],
    back: ['316-180', '317-57', '243-121'],
    be: ['316-180', '194-82'],
    because: ['316-180', '214-146'],
    been: ['316-180', '194-82', '377-44'],
    before: ['316-180', '194-82', '296-121'],
    began: ['316-180', '187-180', '33-62'],
    begin: ['316-180', '187-180'],
    being: ['316-180', '194-82', '10-87'],
    below: ['316-180', '194-82', '371-19', '140-44'],
    between: ['316-180', '194-82', '224-179', '324-82'],
    big: ['316-180', '169-18', '187-180'],
    book: ['316-180', '140-44', '243-121'],
    both: ['316-180', '140-44', '324-82'],
    boy: ['316-180', '140-44', '439-35'],
    but: ['316-180', '71-60', '324-82'],
    by: ['316-180', '439-35'],
    call: ['214-146', '317-57', '371-19'],
    came: ['214-146', '317-57', '194-82'],
    can: ['214-146', '317-57', '377-44'],
    car: ['214-146', '317-57', '223-56'],
    carry: ['214-146', '317-57', '223-56', '353-179', '439-35'],
    change: ['214-146', '333-121', '317-57', '377-44'],
    children: ['214-146', '333-121', '169-18', '371-19', '223-56'],
    city: ['214-146', '169-18', '324-82', '439-35'],
    close: ['214-146', '371-19', '140-44', '446-60', '194-82'],
    come: ['214-146', '140-44', '207-121', '194-82'],
    could: ['214-146', '140-44', '71-60', '371-19', '303-146'],
    country: ['214-146', '71-60', '377-44', '324-82'],
    cut: ['214-146', '71-60', '324-82'],
    day: ['303-146', '317-57', '439-35'],
    did: ['303-146', '169-18'],
    different: ['303-146', '169-18', '296-121'],
    do: ['303-146', '140-44'],
    does: ['303-146', '140-44', '194-82', '446-60'],
    down: ['303-146', '140-44', '224-179', '377-44'],
    each: ['194-82', '317-57', '214-146', '333-121'],
    earth: ['194-82', '353-179'],
    eat: ['194-82', '317-57', '324-82'],
    end: ['194-82', '377-44', '303-146'],
    enough: ['194-82', '377-44', '140-44', '71-60'],
    even: ['194-82', '215-110', '377-44'],
    every: ['194-82', '215-110', '439-35'],
    example: ['194-82', '323-168'],
    eye: ['194-82', '439-35', '353-179'],
    face: ['296-121', '317-57', '214-146', '194-82'],
    family: ['296-121', '317-57', '207-121'],
    far: ['296-121', '317-57', '223-56'],
    father: ['296-121', '317-57', '194-82'],
    feet: ['296-121', '194-82', '324-82'],
    few: ['296-121', '194-82', '224-179'],
    find: ['296-121', '377-44'],
    first: ['296-121', '169-18', '223-56', '446-60', '324-82'],
    follow: ['296-121', '140-44', '371-19', '224-179'],
    food: ['296-121', '140-44', '303-146'],
    for: ['296-121', '140-44', '223-56'],
    form: ['296-121', '207-121'],
    found: ['296-121', '140-44', '71-60', '377-44'],
    four: ['296-121', '140-44', '71-60', '223-56'],
    from: ['296-121', '223-56', '140-44', '207-121'],
    get: ['187-180', '194-82', '324-82'],
    girl: ['187-180', '169-18', '223-56', '371-19'],
    give: ['187-180', '169-18'],
    go: ['187-180', '140-44'],
    good: ['187-180', '140-44', '353-179'],
    got: ['187-180', '140-44', '324-82'],
    great: ['187-180', '223-56', '324-82'],
    group: ['187-180', '223-56', '140-44', '71-60'],
    grow: ['187-180', '223-56', '140-44'],
    had: ['333-121', '317-57'],
    hand: ['333-121', '317-57', '377-44'],
    hard: ['333-121', '317-57', '223-56'],
    has: ['333-121', '317-57', '446-60'],
    have: ['333-121', '317-57', '215-110', '194-82'],
    he: ['333-121', '194-82'],
    head: ['333-121', '214-146'],
    hear: ['333-121', '194-82', '317-57'],
    help: ['333-121', '194-82', '371-19'],
    her: ['333-121', '223-56'],
    here: ['333-121', '187-180'],
    high: ['333-121', '169-18', '187-180'],
    him: ['333-121', '169-18', '207-121'],
    his: ['333-121', '169-18', '446-60'],
    home: ['333-121', '140-44', '207-121', '194-82'],
    house: ['333-121', '140-44', '71-60', '446-60', '194-82'],
    how: ['333-121', '140-44', '224-179'],
    idea: ['169-18', '303-146', '194-82', '317-57'],
    if: ['169-18', '296-121'],
    important: ['169-18', '207-121', '304-110'],
    in: ['169-18', '377-44'],
    Indian: ['169-18', '377-44', '500-62', '40-62'],
    into: ['169-18', '377-44', '324-82'],
    is: ['169-18', '446-60'],
    it: ['169-18', '324-82'],
    its: ['169-18', '324-82', '507-87'],
    just: ['407-18', '71-60'],
    keep: ['243-121', '194-82'],
    kind: ['243-121', '169-18', '377-44', '303-146'],
    know: ['243-121', '377-44', '140-44'],
    land: ['371-19', '317-57', '303-146'],
    large: ['371-19', '317-57', '223-56', '187-180'],
    last: ['371-19', '317-57', '71-60'],
    later: ['371-19', '215-110', '223-56'],
    learn: ['371-19', '223-56'],
    leave: ['371-19', '194-82', '317-57', '215-110'],
    left: ['371-19', '194-82', '296-121', '324-82'],
    let: ['371-19', '194-82', '324-82'],
    letter: ['371-19', '324-82', '223-56'],
    life: ['371-19', '296-121'],
    light: ['371-19', '169-18', '187-180', '333-121'],
    like: ['371-19', '169-18', '243-121'],
    line: ['371-19', '377-44'],
    list: ['371-19', '169-18'],
    little: ['371-19', '169-18', '324-82', '194-82'],
    live: ['371-19', '169-18', '215-110'],
    long: ['371-19', '187-180'],
    look: ['371-19', '140-44', '243-121'],
    made: ['207-121', '317-57', '303-146', '194-82'],
    make: ['207-121', '317-57', '194-82'],
    man: ['207-121', '317-57', '377-44'],
    many: ['207-121', '317-57', '377-44', '101-35'],
    may: ['207-121', '317-57', '439-35'],
    me: ['207-121', '194-82'],
    mean: ['207-121', '194-82', '317-57', '377-44'],
    men: ['207-121', '194-82', '377-44'],
    might: ['207-121', '169-18', '333-121', '324-82'],
    mile: ['207-121', '169-18', '371-19'],
    miss: ['207-121', '169-18', '446-60', '353-179'],
    more: ['207-121', '140-44', '223-56'],
    most: ['207-121', '140-44', '446-60', '324-82'],
    mother: ['207-121', '140-44', '324-82', '333-121', '223-56'],
    mountain: ['207-121', '140-44', '71-60', '377-44', '324-82'],
    move: ['207-121', '140-44', '194-82'],
    much: ['207-121', '71-60', '333-121'],
    must: ['207-121', '71-60', '446-60', '324-82'],
    my: ['207-121', '439-35'],
    name: ['377-44', '317-57', '194-82'],
    near: ['377-44', '223-56'],
    need: ['377-44', '194-82', '353-179'],
    never: ['377-44', '215-110', '223-56'],
    new: ['377-44', '194-82', '224-179'],
    next: ['377-44', '194-82', '323-168', '324-82'],
    night: ['377-44', '169-18', '187-180', '333-121'],
    no: ['377-44', '353-179'],
    not: ['377-44', '140-44', '324-82'],
    now: ['377-44', '140-44', '224-179'],
    number: ['377-44', '71-60', '207-121'],
    of: ['140-44', '296-121'],
    off: ['140-44', '353-179'],
    often: ['140-44', '296-121', '324-82', '194-82', '377-44'],
    oil: ['140-44', '169-18', '371-19'],
    old: ['140-44', '371-19', '303-146'],
    on: ['140-44', '377-44'],
    once: ['140-44', '377-44', '214-146', '194-82'],
    one: ['140-44', '377-44', '194-82'],
    only: ['140-44', '371-19', '439-35'],
    open: ['140-44', '304-110', '194-82', '377-44'],
    or: ['140-44', '223-56'],
    other: ['140-44', '324-82', '333-121', '194-82'],
    our: ['140-44', '71-60'],
    out: ['140-44', '71-60', '324-82'],
    over: ['140-44', '215-110', '194-82'],
    own: ['140-44', '224-179'],
    page: ['304-110', '187-180'],
    paper: ['304-110', '317-57', '194-82'],
    part: ['304-110', '317-57', '223-56'],
    people: ['304-110', '371-19'],
    picture: ['304-110', '169-18', '214-146'],
    place: ['304-110', '371-19', '317-57', '214-146', '194-82'],
    plant: ['304-110', '377-44', '324-82'],
    play: ['304-110', '371-19', '317-57', '439-35'],
    point: ['304-110', '140-44', '377-44', '324-82'],
    put: ['304-110', '71-60', '324-82'],
    question: ['323-204', '353-179'],
    quick: ['323-204', '71-60', '169-18', '243-121'],
    quickly: ['323-204', '71-60', '243-121', '371-19', '439-35'],
    quite: ['323-204', '71-60', '324-82', '194-82'],
    read: ['223-56', '194-82', '317-57', '303-146'],
    really: ['223-56', '317-57', '371-19', '439-35'],
    right: ['223-56', '169-18', '187-180', '333-121', '324-82'],
    river: ['223-56', '215-110', '169-18'],
    run: ['223-56', '71-60', '377-44'],
    said: ['446-60', '317-57', '169-18', '303-146'],
    same: ['446-60', '317-57', '207-121', '194-82'],
    saw: ['446-60', '224-179'],
    say: ['446-60', '353-179'],
    school: ['446-60', '214-146', '333-121', '140-44', '371-19'],
    sea: ['214-146', '353-179'],
    second: ['446-60', '194-82', '214-146'],
    see: ['446-60', '194-82', '353-179'],
    seem: ['446-60', '194-82', '207-121'],
    sentence: ['446-60', '194-82', '377-44', '324-82', '214-146'],
    set: ['446-60', '194-82', '324-82'],
    she: ['446-60', '333-121', '194-82'],
    should: ['446-60', '333-121', '140-44', '71-60'],
    show: ['446-60', '333-121', '140-44', '224-179'],
    side: ['446-60', '169-18', '303-146'],
    small: ['446-60', '207-121', '317-57'],
    so: ['446-60', '140-44'],
    some: ['446-60', '140-44', '207-121', '194-82'],
    something: ['446-60', '140-44', '207-121', '194-82', '324-82', '333-121'],
    sometimes: ['446-60', '140-44', '207-121', '194-82', '324-82', '507-87'],
    song: ['446-60', '140-44', '377-44', '187-180'],
    soon: ['446-60', '140-44', '353-179', '377-44'],
    sound: ['446-60', '140-44', '71-60', '377-44', '303-146'],
    spell: ['446-60', '304-110', '371-19'],
    start: ['446-60', '324-82', '223-56', '353-179'],
    state: ['446-60', '194-82'],
    still: ['446-60', '324-82', '169-18', '353-179'],
    stop: ['446-60', '324-82', '140-44'],
    story: ['446-60', '324-82', '223-56', '101-35'],
    study: ['446-60', '324-82', '71-60', '303-146'],
    such: ['446-60', '71-60', '214-146', '333-121'],
    take: ['324-82', '243-121', '194-82'],
    talk: ['324-82', '243-121', '371-19'],
    tell: ['324-82', '194-82', '371-19'],
    than: ['324-82', '333-121', '377-44'],
    that: ['324-82', '333-121'],
    the: ['324-82', '194-82'],
    their: ['324-82', '333-121', '169-18', '223-56'],
    them: ['324-82', '333-121', '194-82', '207-121'],
    then: ['324-82', '333-121', '194-82', '377-44'],
    there: ['324-82', '333-121', '194-82'],
    these: ['324-82', '333-121', '194-82', '446-60'],
    they: ['324-82', '333-121', '194-82', '439-35'],
    thing: ['324-82', '333-121', '169-18', '377-44', '187-180'],
    think: ['324-82', '333-121', '169-18', '377-44', '243-121'],
    this: ['324-82', '333-121', '169-18', '446-60'],
    those: ['324-82', '333-121', '140-44', '446-60', '194-82'],
    thought: ['324-82', '333-121', '140-44', '71-60', '187-180'],
    three: ['324-82', '333-121', '223-56', '194-82'],
    through: ['324-82', '333-121', '223-56', '71-60'],
    time: ['324-82', '169-18', '207-121'],
    to: ['324-82', '140-44'],
    together: ['324-82', '140-44', '187-180', '194-82', '333-121'],
    too: ['324-82', '140-44', '353-179'],
    took: ['324-82', '140-44', '243-121'],
    tree: ['324-82', '223-56', '353-179'],
    try: ['324-82', '223-56', '439-35'],
    turn: ['324-82', '71-60', '223-56', '377-44'],
    two: ['324-82', '224-179', '140-44'],
    under: ['71-60', '377-44', '303-146', '194-82'],
    until: ['71-60', '377-44', '324-82'],
    up: ['71-60', '304-110'],
    us: ['71-60', '446-60'],
    use: ['71-60', '446-60', '194-82'],
    very: ['215-110', '223-56', '439-35'],
    walk: ['224-179', '317-57', '243-121', '371-19'],
    want: ['224-179', '317-57', '377-44'],
    was: ['224-179', '317-57'],
    watch: ['224-179'],
    water: ['224-179', '324-82', '223-56'],
    way: ['224-179', '317-57', '439-35'],
    we: ['224-179', '194-82'],
    well: ['224-179', '194-82', '371-19'],
    went: ['224-179', '194-82', '377-44', '324-82'],
    were: ['224-179', '223-56'],
    what: ['224-179', '333-121', '317-57'],
    when: ['224-179', '333-121', '194-82', '377-44'],
    where: ['224-179', '333-121', '194-82', '223-56'],
    which: ['224-179', '333-121', '169-18'],
    while: ['224-179', '333-121', '169-18', '371-19'],
    white: ['224-179', '333-121', '169-18', '324-82', '194-82'],
    who: ['224-179', '333-121'],
    why: ['224-179', '333-121', '439-35'],
    will: ['224-179', '169-18', '371-19'],
    with: ['224-179', '169-18', '324-82', '333-121'],
    without: ['224-179', '324-82'],
    word: ['224-179', '140-44', '223-56', '303-146'],
    work: ['224-179', '140-44', '223-56'],
    world: ['224-179', '140-44', '223-56', '371-19', '303-146'],
    would: ['224-179', '140-44', '71-60', '371-19', '303-146'],
    write: ['224-179', '223-56', '169-18', '324-82'],
    year: ['439-35', '194-82', '317-57'],
    you: ['439-35', '140-44', '71-60'],
    young: ['439-35', '140-44', '71-60', '377-44'],
    your: ['439-35', '223-56'],
  },
  trigrams: {
    the: [],
    tha: [],
    eth: [],
    for: [],
    est: [],
    hes: [],
    oth: [],
    tth: [],
    wit: [],
    res: [],
    rth: [],
    you: [],
    edt: [],
    ast: [],
    con: [],
    nce: [],
    man: [],
    out: [],
    she: [],
    eri: [],
    att: [],
    hin: [],
    ine: [],
    rin: [],
    han: [],
    and: [],
    ent: [],
    nth: [],
    all: [],
    tio: [],
    ith: [],
    ate: [],
    ont: [],
    was: [],
    sin: [],
    eof: [],
    ons: [],
    era: [],
    ted: [],
    hen: [],
    ort: [],
    ant: [],
    ein: [],
    eco: [],
    hea: [],
    ran: [],
    ill: [],
    com: [],
    ing: [],
    ere: [],
    hat: [],
    sth: [],
    his: [],
    ers: [],
    dth: [],
    rea: [],
    are: [],
    tin: [],
    sof: [],
    sto: [],
    eve: [],
    din: [],
    sta: [],
    ght: [],
    not: [],
    esa: [],
    ngt: [],
    ndt: [],
    ave: [],
    ive: [],
    hec: [],
    nde: [],
    igh: [],
    her: [],
    ion: [],
    int: [],
    ter: [],
    oft: [],
    ati: [],
    ver: [],
    san: [],
    ear: [],
    ess: [],
    ean: [],
    ist: [],
    one: [],
    ome: [],
    our: [],
    hem: [],
    ore: [],
    ert: [],
    edi: [],
    nto: [],
    men: [],
    eda: [],
    tan: [],
    tho: [],
    ain: [],
  },
  lexical: {
    about: [],
    above: [],
    add: [],
    after: [],
    again: [],
    air: [],
    all: [],
    almost: [],
    along: [],
    also: [],
    always: [],
    America: [],
    an: [],
    and: [],
    animal: [],
    another: [],
    answer: [],
    any: [],
    are: [],
    around: [],
    as: [],
    ask: [],
    at: [],
    away: [],
    back: [],
    be: [],
    because: [],
    been: [],
    before: [],
    began: [],
    begin: [],
    being: [],
    below: [],
    between: [],
    big: [],
    book: [],
    both: [],
    boy: [],
    but: [],
    by: [],
    call: [],
    came: [],
    can: [],
    car: [],
    carry: [],
    change: [],
    children: [],
    city: [],
    close: [],
    come: [],
    could: [],
    country: [],
    cut: [],
    day: [],
    did: [],
    different: [],
    do: [],
    does: [],
    "don't": [],
    down: [],
    each: [],
    earth: [],
    eat: [],
    end: [],
    enough: [],
    even: [],
    every: [],
    example: [],
    eye: [],
    face: [],
    family: [],
    far: [],
    father: [],
    feet: [],
    few: [],
    find: [],
    first: [],
    follow: [],
    food: [],
    for: [],
    form: [],
    found: [],
    four: [],
    from: [],
    get: [],
    girl: [],
    give: [],
    go: [],
    good: [],
    got: [],
    great: [],
    group: [],
    grow: [],
    had: [],
    hand: [],
    hard: [],
    has: [],
    have: [],
    he: [],
    head: [],
    hear: [],
    help: [],
    her: [],
    here: [],
    high: [],
    him: [],
    his: [],
    home: [],
    house: [],
    how: [],
    idea: [],
    if: [],
    important: [],
    in: [],
    Indian: [],
    into: [],
    is: [],
    it: [],
    its: [],
    "it's": [],
    just: [],
    keep: [],
    kind: [],
    know: [],
    land: [],
    large: [],
    last: [],
    later: [],
    learn: [],
    leave: [],
    left: [],
    let: [],
    letter: [],
    life: [],
    light: [],
    like: [],
    line: [],
    list: [],
    little: [],
    live: [],
    long: [],
    look: [],
    made: [],
    make: [],
    man: [],
    many: [],
    may: [],
    me: [],
    mean: [],
    men: [],
    might: [],
    mile: [],
    miss: [],
    more: [],
    most: [],
    mother: [],
    mountain: [],
    move: [],
    much: [],
    must: [],
    my: [],
    name: [],
    near: [],
    need: [],
    never: [],
    new: [],
    next: [],
    night: [],
    no: [],
    not: [],
    now: [],
    number: [],
    of: [],
    off: [],
    often: [],
    oil: [],
    old: [],
    on: [],
    once: [],
    one: [],
    only: [],
    open: [],
    or: [],
    other: [],
    our: [],
    out: [],
    over: [],
    own: [],
    page: [],
    paper: [],
    part: [],
    people: [],
    picture: [],
    place: [],
    plant: [],
    play: [],
    point: [],
    put: [],
    question: [],
    quick: [],
    quickly: [],
    quite: [],
    read: [],
    really: [],
    right: [],
    river: [],
    run: [],
    said: [],
    same: [],
    saw: [],
    say: [],
    school: [],
    sea: [],
    second: [],
    see: [],
    seem: [],
    sentence: [],
    set: [],
    she: [],
    should: [],
    show: [],
    side: [],
    small: [],
    so: [],
    some: [],
    something: [],
    sometimes: [],
    song: [],
    soon: [],
    sound: [],
    spell: [],
    start: [],
    state: [],
    still: [],
    stop: [],
    story: [],
    study: [],
    such: [],
    take: [],
    talk: [],
    tell: [],
    than: [],
    that: [],
    the: [],
    their: [],
    them: [],
    then: [],
    there: [],
    these: [],
    they: [],
    thing: [],
    think: [],
    this: [],
    those: [],
    thought: [],
    three: [],
    through: [],
    time: [],
    to: [],
    together: [],
    too: [],
    took: [],
    tree: [],
    try: [],
    turn: [],
    two: [],
    under: [],
    until: [],
    up: [],
    us: [],
    use: [],
    very: [],
    walk: [],
    want: [],
    was: [],
    watch: [],
    water: [],
    way: [],
    we: [],
    well: [],
    went: [],
    were: [],
    what: [],
    when: [],
    where: [],
    which: [],
    while: [],
    white: [],
    who: [],
    why: [],
    will: [],
    with: [],
    without: [],
    word: [],
    work: [],
    world: [],
    would: [],
    write: [],
    year: [],
    you: [],
    young: [],
    your: [],
  },
  get all() {
    return {
      ...this.trigrams,
      ...this.lexical,
      ...this.letters,
      ...this.chords,
    };
  },
};
