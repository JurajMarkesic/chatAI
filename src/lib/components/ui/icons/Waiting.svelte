<div class="dots"><span class="dots-item">.</span><span class="dots-item dots-item-middle">.</span><span class="dots-item dots-item-end">.</span></div>


<style>
.dots-item {
    opacity: 0;
    animation: dot-opacity 1.5s infinite linear;
    animation-delay: 0s;
}
.dots-item-middle {
    animation-delay: 0.25s;
}
.dots-item-end {
    animation-delay: 0.5s;
}

@keyframes dot-opacity {
    0% {
        opacity: 0;
    }
    30% {
        opacity: 1;
    }
    60%, 100% {
        opacity: 0;
    }
}
</style>
