<template>
	<th :key="`th-${col.key}`" :class="col.class" v-bind="col.colProps">
		<div v-outsideClick="outsideClickHandler" ref="filterContainerRef" style="position: relative">
			<div :style="thWrapperStyle">
				<span v-if="!(col.key == 'checkbox')">{{ col.label !== undefined ? col.label : $t(`${localPrefix}${col.key}`) }}</span>
				<slot v-else :name="`col-${col.key}`"></slot>
				<div v-if="col.enableFilter">
					<v-icon size="15" color="#aaa" @click="toggleFilter">mdi-filter-outline</v-icon>
				</div>
			</div>
			<div v-if="col.enableFilter && openFilter && col.type === undefined " :style="doFilterDropStyle(index)">

				<v-card class="mx-auto" variant="elevated" :style="filterCardStyle">
					<v-card-item class="pb-0">
						<div>
							<div v-for="option of col.filterOptions">
								<v-checkbox-btn hide-details="auto" color="#9C27B0" density="compact" class="pe-2"
									:value="option.value" v-model="selectedFilterValues">
									<template v-slot:label>
										<span style="font-size: 0.8rem; font-weight: 500;">{{ option.label }}</span>
									</template>
								</v-checkbox-btn>
							</div>
						</div>
					</v-card-item>

					<v-card-actions style="padding: 0.3rem 1rem;min-height: 0">
						<v-btn :size="'small'" @click="onClickResetFilter">
							Reset
						</v-btn>
						<div></div>
						<v-btn :size="'small'" @click="onClickApplyFilter">
							{{ $t('apply') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</div>
			<div v-else-if="col.enableFilter && openFilter && col.type === 'text'" :style="doFilterDropStyle(index)" style="width: 200px;">
				<v-card class="mx-auto" variant="elevated" :style="filterCardStyle">
					<v-card-item class="pb-0">
						<div>
							<v-text-field
							v-model="selectedFilterValues"
							type="text"
							/>
						</div>
					</v-card-item>
					<v-card-actions style="padding: 0.3rem 1rem;min-height: 0">
						<v-btn :size="'small'" @click="onClickResetFilter">
							Reset
						</v-btn>
						<div></div>
						<v-btn :size="'small'" @click="onClickApplyFilter">
							{{ $t('apply') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</div>
			<div v-else-if="col.enableFilter && openFilter && col.type === 'date'" :style="doFilterDropStyle(index)" style="width: 200px;">
				<v-card class="mx-auto" variant="elevated" :style="filterCardStyle">
					<v-card-item class="pb-0">
						<div>
							<v-text-field
							v-model="selectedFilterValues[0]"
							type="date"
							label="Inserire data da"
							/>
							<v-text-field
							v-model="selectedFilterValues[1]"
							type="date"
							label="Inserire data a"
							range
							/>
  
       
						</div>
					</v-card-item>
					<v-card-actions style="padding: 0.3rem 1rem;min-height: 0">
						<v-btn :size="'small'" @click="onClickResetFilter">
							Reset
						</v-btn>
						<div></div>
						<v-btn :size="'small'" @click="onClickApplyFilter">
							{{ $t('apply') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</div>

			<div v-else-if="col.enableFilter && openFilter && col.type === 'range'" :style="doFilterDropStyle(index)">
				<v-card flat class="mx-auto" variant="elevated" :style="filterCardStyle">
					
				<v-card-text>
					<div>
						<v-text-field
							v-model="selectedFilterValues[0]"
							type="number"
							label="Inserire l'importo da"
						></v-text-field>
						
						<v-text-field
							v-model="selectedFilterValues[1]"
							type="number"
							label="Inserire l'importo a"
						></v-text-field>
					</div>
				</v-card-text>
				<v-card-actions style="padding: 0.3rem 1rem;min-height: 0">
						<v-btn :size="'small'" @click="onClickResetFilter">
							Reset
						</v-btn>
						<div></div>
						<v-btn :size="'small'" @click="onClickApplyFilter">
							{{ $t('apply') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</div>
		</div>
	</th>
</template>
<script setup lang="ts">
import type { DatatableColInterface } from '@/@types';
import { reactive, ref, watch, onMounted } from 'vue';

interface Props {
  index: number,
	localPrefix?: string,
	col: DatatableColInterface
}

const props = withDefaults(defineProps<Props>(), {
	localPrefix: 'table.'
})

const thWrapperStyle = reactive({ width: '100%', display: 'flex' })

const doFilterDropStyle = (index: number) => {
  if(index == 0) {
    return filterDropStyleFirtFilter
  } else {
    return filterDropStyle
  }
}

const filterDropStyle = reactive({
	position: 'absolute',
	top: '32px',
	right: 0,
  left: 0,
	minWidth: '100px',
	width: 'max-content',
	zIndex: 99
})

const filterDropStyleFirtFilter = reactive({
	position: 'absolute',
	top: '32px',
	left: 0,
	minWidth: '100px',
	width: 'max-content',
	zIndex: 99
})

const filterCardStyle = reactive({
	border: '1px solid #ede2e2d1',
	borderRadius: '0'
})

const selectedFilterValues = ref([])
const amountRange = ref([])
const filterContainerRef = ref(null)
const openFilter = ref(false)

const emit = defineEmits(['filterToggle', 'filterApply'])

/// handlers
const toggleFilter = () => {
	openFilter.value = !openFilter.value
	emit('filterToggle', openFilter.value)
}

const outsideClickHandler = () => {
	if (openFilter.value) {
		toggleFilter()
	}
}

const onClickApplyFilter = () => {
	toggleFilter()
	console.log(selectedFilterValues.value.hasOwnProperty(0));
	if  (props.col.type === 'range'){
	
		if (!selectedFilterValues.value.hasOwnProperty(0) && selectedFilterValues.value.hasOwnProperty(1)) {
			selectedFilterValues.value[0] = 0;

		}else if (selectedFilterValues.value.hasOwnProperty(0) && !selectedFilterValues.value.hasOwnProperty(1)) {
			selectedFilterValues.value[1] = 100000000;
		}
	}	

	var value = selectedFilterValues.value
	
	emit('filterApply', {
		key: props.col.key,
		values: value
	});
}

const onClickResetFilter = () => {
	selectedFilterValues.value = [];
}
</script>