class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
    moveNext() {
        return this.next;
    }
    movePrev() {
        return this.prev;
    }
    getCurrent() {
        return this.data;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;   
        this.tail = null;
        this.current = null;
    }
    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode;
            // Make it circular
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            newNode.next = this.head;  // Make it circular
            this.head.prev = newNode;  // Complete the circle
            this.tail = newNode;
        }
    }
    getHead() {
        return this.head;
    }
    getTail() {
        return this.tail;
    }
    isEmpty() {
        return this.head === null;
    }
    clear() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }
    toArray() {
        if (!this.head) return [];
        const array = [];
        let current = this.head;
        do {
            array.push(current.getCurrent());
            current = current.moveNext();
        } while (current !== this.head);
        return array;
    }
    fromArray(array) {
        this.clear();
        for (const item of array) {
            this.append(item);
        }
    }
    getCurrent() {
        return this.current ? this.current.getCurrent() : null;
    }
    moveNext() {
        if (this.current) {
            this.current = this.current.moveNext();
            return this.current.getCurrent();
        }
        return null;
    }
    movePrev() {
        if (this.current) {
            this.current = this.current.movePrev();
            return this.current.getCurrent();
        }
        return null;
    }
    reset() {
        this.current = this.head;
        return this.getCurrent();
    }
}

// Initialize the playlist with some sample songs
const playlist = new DoublyLinkedList();
const songs = [
    { title: "Song 1", url: "path/to/song1.mp3" },
    { title: "Song 2", url: "path/to/song2.mp3" },
    { title: "Song 3", url: "path/to/song3.mp3" }
];

// Initialize the player
document.addEventListener('DOMContentLoaded', () => {
    // Add songs to playlist
    songs.forEach(song => playlist.append(song));
    
    // Get DOM elements
    const audioElement = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const titleSpan = document.getElementById('track-title');
    
    let isPlaying = false;

    // Function to update the display
    function updateDisplay(song, playing = false) {
        titleSpan.textContent = playing ? `Playing: ${song.title}` : `Paused: ${song.title}`;
        audioElement.src = song.url;
    }

    // Initialize with first song
    if (!playlist.isEmpty()) {
        const firstSong = playlist.getCurrent();
        updateDisplay(firstSong);
    }

    // Play/Pause button handler
    playButton.addEventListener('click', () => {
        if (!playlist.isEmpty()) {
            isPlaying = !isPlaying;
            if (isPlaying) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
            updateDisplay(playlist.getCurrent(), isPlaying);
            playButton.textContent = isPlaying ? 'Pause' : 'Play';
        }
    });

    // Previous button handler
    prevButton.addEventListener('click', () => {
        if (!playlist.isEmpty()) {
            const prevSong = playlist.movePrev();
            updateDisplay(prevSong, isPlaying);
            if (isPlaying) {
                audioElement.play();
            }
        }
    });

    // Next button handler
    nextButton.addEventListener('click', () => {
        if (!playlist.isEmpty()) {
            const nextSong = playlist.moveNext();
            updateDisplay(nextSong, isPlaying);
            if (isPlaying) {
                audioElement.play();
            }
        }
    });
});
