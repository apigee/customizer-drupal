/**
 * Copyright 2019 Google LLC
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License version 2 as published by the
 * Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
 * License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */

(function($, Drupal) {

  Drupal.behaviors.customizerForm = {
    attach(context, settings) {
      const styles = $('body').get(0).style;
      const $form = $('.customizer-form');
      const $pickerWrapper = $form.find('#farbtastic-wrapper');

      if ($form.length && $pickerWrapper.length) {
        const $picker = $.farbtastic($pickerWrapper);

        // Attach a color picker to color fields.
        $form.find('[data-picker]').each(function () {
          attachColorPicker($(this));
        }).focus(function () {
          attachColorPicker($(this));
        }).change(function () {
          styles.setProperty($(this).attr('name'), $(this).val());
        });

        /**
         * Helper to attach a color picker to the given element.
         *
         * @param el
         */
        function attachColorPicker(el) {
          $picker.linkTo(function (color) {
            el.css({ backgroundColor: color, color: (this.hsl[2] > 0.5 ? '#000' : '#fff') })
              .val(color)
              .change();
          }).setColor(el.val());
        }
      }
    }
  }
})(jQuery, Drupal);
