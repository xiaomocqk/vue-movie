<template>
	<div id="coming-soon">
		<v-head :prop="2"></v-head>
		<loading v-if="loading"></loading>
		<ul>
			<li v-for="item in movies"
				@click="comingSoonPage(item.id)"
			>
				<img 	:src="item.images.small"
						:alt="item.alt"
				>
				<div class="info">
					<h3 class="film-title">
						{{item.title}}
					</h3>
					<stars :score="item.rating.average"
					>
					</stars>
					<div class="score">
						{{item.rating.average}}分
					</div>
					<div class="director">
						导演：
						<span v-for="director in item.directors"
									class="mr5"
						>
							{{ director.name }}
						</span>
					</div>
					<div class="cast">
						主演：
						<span v-for="cast in item.casts"
									class="mr5"
						>
							{{cast.name}}
						</span>
					</div>
				</div>
			</li>
		</ul>
		<p 	id="show-end"
			v-if="showEnd"
		>
			已经到底了
		</p>
	</div>
</template>

<script>
	import vHead from '../vHead/vHead.vue'
	import Loading from '../Loading/Loading.vue'
	import Stars from '../Stars/Stars.vue'

	// const DEFAULT_COUNT = 5;		//一次最多请求5条

	export default {
		data() {
			return {
				// tabActive:1,//索引值，表示频道“即将上映”其样式应处于active
				loading:true,
				showEnd:false,//底线
				movies:[]
			}
		},
		components:{
			vHead,
			Loading,
			Stars
		},
		created(){//个人觉得created比mounted好
			// https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&start=0&count=100&client=somemessage&udid=dddddddddddddddddddddd
			if (window.cache.commingSoon.length) {
				this.movies = window.cache.commingSoon;
				this.loading = false;
			} else {
				let url = 'https://api.douban.com/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b&city='+ encodeURI(window.cache.CURRENT_CITY);
				this.$http.jsonp(url)
					.then((response) => {
						window.cache.commingSoon = this.movies = response.body.subjects;
						this.loading = false;
						this.showEnd = true;
					})
					.catch((response) => {
						console.log(response)
					}
				);
			}
		},
		methods:{
			comingSoonPage(id) {
				const path = '/filmDetails/'+id;
				this.$router.push({path:path})
			}
		}
	}
</script>

<style lang="less">
	#coming-soon {
		ul{
			padding: 0 20px;
		}
		li{
			display: flex;
			border-bottom: 1px solid #d6d6d6;
			padding: 10px 0;
			align-items:flex-end;
			line-height: 1.5;

			img{
				width: 65px;
				height: 100px;
			}
		}
		.info {
			padding-left: 20px;
			overflow: hidden;
		}
		.film-title {
			font-size: 20px;
			line-height: 2;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.score {
			font-size: 15px;
		}
		.director,.cast{
			font-size: 14px;
			color: #666;

			span{
				margin-right: 10px;
			}
		}
		#show-end{
			text-align: center;
			line-height: 2;
			color: #999;
		}
	}
</style>