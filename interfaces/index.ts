export interface Minifig {
  last_modified_dt: string
  name: string
  num_parts: number
  set_img_url: string
  set_num: string
  set_url: string
}

export interface MinifigElement {
  part: MinifigPart
}

export interface MinifigPart {
  name: string
  part_img_url: string
  part_num: string
}