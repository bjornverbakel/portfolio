<script setup lang="ts">
import { NuxtImg } from "#components";
import { Icon } from '@iconify/vue'
</script>

<template>
    <NuxtLayout>
        <article class="w-full flex flex-col gap-16 text-justify">
            <section class="flex flex-col gap-4">
                <h1 class="text-xl" data-fade-color>Contact</h1>
                <p data-fade-color>You can contact me at:</p>
                <div class="flex flex-col gap-4">
                    <a class="btn mix-blend-difference flex align-middle gap-2 underline underline-offset-4 decoration-2"
                        href="mailto:contact@bjornverbakel.nl" data-fade-color>
                        <Icon icon="material-symbols:mail-sharp" height="none"
                            :style="{ width: '2rem', height: '2rem' }" />
                        <span class="mix-blend-difference">contact@bjornverbakel.nl</span>
                    </a>
                    <!-- <a class="btn mix-blend-difference flex align-middle gap-2 underline underline-offset-4 decoration-2"
                        href="tel:#" data-fade-color>
                        <Icon icon="material-symbols:call-sharp" height="none"
                            :style="{ width: '2rem', height: '2rem' }" />
                        <span class="mix-blend-difference">1234567890</span>
                    </a> -->
                </div>
            </section>
            <section class="flex flex-col gap-4">
                <h2 class="text-lg" data-fade-color>You can also find me on:</h2>
                <div class="flex gap-4">
                    <a href="https://www.linkedin.com/in/bjorn-verbakel-651938349/" class="hover-btn btn"
                        data-fade-opacity>
                        <NuxtImg src="/images/linkedin.svg" alt="LinkedIn" /><span>LinkedIn</span>
                    </a>
                    <a href="https://github.com/bjornverbakel" class="hover-btn btn" data-fade-opacity>
                        <NuxtImg src="/images/github.svg" alt="Github" /><span>Github</span>
                    </a>
                </div>
            </section>
        </article>
    </NuxtLayout>
</template>

<style scoped>
a {
  cursor: none;
}
</style>