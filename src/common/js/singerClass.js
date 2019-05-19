export default class Singer {
    constructor({id, name, subtitle, totalAlbum, totalMv, totalSong, brief}) {
        this.id = id;
        this.name = name;
        this.subtitle = subtitle;
        this.totalAlbum = totalAlbum;
        this.totalMv = totalMv;
        this.totalSong = totalSong;
        this.brief = brief;
        this.avatar = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    }
}